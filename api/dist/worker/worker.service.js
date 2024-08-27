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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const operation_1 = require("../common/interface/operation");
const history_service_1 = require("../history/history.service");
let WorkerService = class WorkerService {
    constructor(historyService) {
        this.historyService = historyService;
    }
    executeOperation(operation) {
        const partialResult = this.execute(operation);
        const result = {
            ...partialResult,
            operationText: `${operation.operating1} ${operation.operationType} ${operation.operating2} = ${(partialResult.error) ? "" : partialResult.result}`,
            type: operation.operationType
        };
        if (result.error) {
            return result;
        }
        this.historyService.pushOperation(result);
        return result;
    }
    execute(operation) {
        switch (operation.operationType) {
            case operation_1.eOperationType.addition:
                return this.addition(operation);
            case operation_1.eOperationType.substraction:
                return this.substraction(operation);
            case operation_1.eOperationType.multiplication:
                return this.multiplication(operation);
            case operation_1.eOperationType.division:
                return this.division(operation);
            default:
                return this.unkown();
        }
    }
    addition(operation) {
        return {
            result: operation.operating1 + operation.operating2,
            message: "No error",
            error: false
        };
    }
    substraction(operation) {
        return {
            result: operation.operating1 - operation.operating2,
            message: "No error",
            error: false
        };
    }
    multiplication(operation) {
        return {
            result: operation.operating1 * operation.operating2,
            message: "No error",
            error: false
        };
    }
    division(operation) {
        if (operation.operating2 === 0) {
            return {
                result: 0,
                message: "Division by zero",
                error: true
            };
        }
        return {
            result: operation.operating1 / operation.operating2,
            message: "No error",
            error: false
        };
    }
    unkown() {
        return {
            result: 0,
            message: "Unkown operation",
            error: true
        };
    }
};
exports.WorkerService = WorkerService;
exports.WorkerService = WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], WorkerService);
//# sourceMappingURL=worker.service.js.map