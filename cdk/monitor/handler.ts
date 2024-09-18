
import  {APIGatewayProxyEvent, APIGatewayProxyResult, Context, SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/';

async function handler(event: SNSEvent, context:any) {
    for(const item of event.Records){
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `ERROR: ${item.Sns.Message}`
            })
        });
    }
}

export { handler };