"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationapiModule = void 0;
const common_1 = require("@nestjs/common");
const operationapi_controller_1 = require("./operationapi.controller");
const parser_service_1 = require("../parser/parser.service");
const worker_service_1 = require("../worker/worker.service");
const history_service_1 = require("../history/history.service");
let OperationapiModule = class OperationapiModule {
};
exports.OperationapiModule = OperationapiModule;
exports.OperationapiModule = OperationapiModule = __decorate([
    (0, common_1.Module)({
        imports: [OperationapiModule],
        controllers: [operationapi_controller_1.OperationapiController],
        providers: [parser_service_1.ParserService, worker_service_1.WorkerService, history_service_1.HistoryService],
    })
], OperationapiModule);
//# sourceMappingURL=operationapi.module.js.map