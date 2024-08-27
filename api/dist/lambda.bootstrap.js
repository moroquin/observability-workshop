"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapLambda = void 0;
const core_1 = require("@nestjs/core");
const express = require("express");
const serverlessExpress = require("@codegenie/serverless-express");
const platform_express_1 = require("@nestjs/platform-express");
const operationapi_module_1 = require("./operationapi/operationapi.module");
let cachedServer;
const bootstrapLambda = async (attachPipes) => {
    if (!cachedServer) {
        const expressApp = express();
        const expressAdapter = new platform_express_1.ExpressAdapter(expressApp);
        const nestApp = await core_1.NestFactory.create(operationapi_module_1.OperationapiModule, expressAdapter);
        nestApp.enableCors();
        attachPipes(nestApp);
        await nestApp.init();
        cachedServer = serverlessExpress.configure({ app: expressApp });
        return cachedServer;
    }
    return cachedServer;
};
exports.bootstrapLambda = bootstrapLambda;
//# sourceMappingURL=lambda.bootstrap.js.map