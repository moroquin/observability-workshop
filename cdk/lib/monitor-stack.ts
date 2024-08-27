import * as cdk from "aws-cdk-lib";
import { Alarm, Metric, Unit } from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { join } from "path";



export class MonitorStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const webHookLambda = new NodejsFunction(this, 'WebHookLambda',{
        runtime: Runtime.NODEJS_20_X,
        handler: 'handler',
        entry: (join(__dirname,'..','monitor','handler.ts')),
        tracing: Tracing.ACTIVE,
        timeout: cdk.Duration.minutes(1)
      })

      const alarmTopic = new Topic(this, 'AlarmTopic',{
        displayName: 'AlarmTopic',
        topicName: 'AlarmTopic'
      })
      alarmTopic.addSubscription(new LambdaSubscription(webHookLambda));

      const api400Alarm = new Alarm(this, 'api4xxAlarm',{
        metric: new Metric({
            metricName: '4XXError',
            namespace: 'AWS/ApiGateway',
            period: cdk.Duration.minutes(1),
            statistic: 'Sum',
            unit: Unit.COUNT,
            dimensionsMap:{
                "ApiName": "ApiRestF"
            },
        }),
        evaluationPeriods: 1,
        threshold: 5, 
        alarmName: 'api4xxAlarm'
      });

      const topicAction = new SnsAction(alarmTopic);
      api400Alarm.addAlarmAction(topicAction);
      api400Alarm.addOkAction(topicAction);


    }
}