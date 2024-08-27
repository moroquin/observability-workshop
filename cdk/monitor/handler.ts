
import  {APIGatewayProxyEvent, APIGatewayProxyResult, Context, SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

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