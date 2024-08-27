import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { DockerImageCode, DockerImageFunction, Tracing } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as logs from "aws-cdk-lib/aws-logs";
import path = require("path");

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new lambda function
    const LambdaHandler = new DockerImageFunction(this, "LambdaHandlerF", {
      timeout: cdk.Duration.seconds(30),
      functionName: "LambdaHandlerF",
      code: DockerImageCode.fromImageAsset(path.join(__dirname, "../../api")),
      tracing: Tracing.ACTIVE,
    });

    // Create a new Log Group and Log Stream for the Lambda function
    new logs.LogGroup(this, "LambdaHandlerLogGroupF", {
      logGroupName: `/aws/lambda/${LambdaHandler.functionName}`,
      retention: logs.RetentionDays.ONE_WEEK,
    });

    // Create a new api gateway
    const api = new RestApi(this, "ApiRestF", {
      restApiName: "ApiRestF",
      deploy: true,
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
      deployOptions: {
        tracingEnabled: true,
        // <snip>
      },
    });

    // add proxy resource to handle all api requests
    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(LambdaHandler, {
        proxy: true,
      }),
    });

    //add api key to enable monitoring
    const apiKey = api.addApiKey("ApiKey");
    const usagePlan = api.addUsagePlan("ApiUsagePlan", {
      name: "ApiUsagePlan",
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });

    // // add the api key to the usage plan
    usagePlan.addApiKey(apiKey);

    // add the api key to the output
    new cdk.CfnOutput(this, "api-key", {
      value: apiKey.keyId,
      exportName: `keyId`,
    });
  }
}
