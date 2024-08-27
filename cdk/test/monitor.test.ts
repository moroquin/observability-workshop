import { SNSEvent } from "aws-lambda";
import { handler } from "../monitor/handler";

const snsEvent: SNSEvent = {
    Records:[{
        Sns: {
            Message: "Testing sns messages",
        }
    }]

} as any;

handler(snsEvent, {});

//