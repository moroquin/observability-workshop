"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationapiController = void 0;
const common_1 = require("@nestjs/common");
const history_service_1 = require("../history/history.service");
const CreateOperationDto_1 = require("../common/dto/CreateOperationDto");
const parser_service_1 = require("../parser/parser.service");
const worker_service_1 = require("../worker/worker.service");
const operation_1 = require("../common/interface/operation");
let OperationapiController = class OperationapiController {
    constructor(historyService, parserService, workerService) {
        this.historyService = historyService;
        this.parserService = parserService;
        this.workerService = workerService;
    }
    getHistoryOperations() {
        console.log("holitas holitas");
        return this.historyService.getAll();
    }
    executeNewOperation(createOperationDto, res) {
        console.log("holitas holitas");
        if (createOperationDto.operationText === undefined) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Error in the payload' });
        }
        const operation = this.parserService.parseOperation({
            type: operation_1.eOperationType.unkown,
            operationText: createOperationDto.operationText,
            result: 0,
            error: false,
            message: '',
        });
        if (operation.error) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: operation.message });
        }
        const operationExecuted = this.workerService.executeOperation(operation);
        if (operationExecuted.error) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: operationExecuted.message });
        }
        return res.status(common_1.HttpStatus.OK).json(operationExecuted);
    }
};
exports.OperationapiController = OperationapiController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], OperationapiController.prototype, "getHistoryOperations", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOperationDto_1.CreateOperationDto, Object]),
    __metadata("design:returntype", void 0)
], OperationapiController.prototype, "executeNewOperation", null);
exports.OperationapiController = OperationapiController = __decorate([
    (0, common_1.Controller)('operations'),
    __metadata("design:paramtypes", [history_service_1.HistoryService,
        parser_service_1.ParserService,
        worker_service_1.WorkerService])
], OperationapiController);
//# sourceMappingURL=operationapi.controller.js.map