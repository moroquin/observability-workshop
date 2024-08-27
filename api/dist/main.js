"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const lambda_bootstrap_1 = require("./lambda.bootstrap");
const operationapi_module_1 = require("./operationapi/operationapi.module");
function attachPipes(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors();
}
if (process.env.NODE_ENV === 'local') {
    async function bootstrap() {
        const app = await core_1.NestFactory.create(operationapi_module_1.OperationapiModule);
        attachPipes(app);
        await app.listen(4200);
    }
    bootstrap();
}
const handler = async (event, context, callback) => {
    console.log('Event', event);
    const server = await (0, lambda_bootstrap_1.bootstrapLambda)(attachPipes);
    return server(event, context, callback);
};
module.exports.handler = handler;
//# sourceMappingURL=main.js.map