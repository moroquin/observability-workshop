"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserService = void 0;
const common_1 = require("@nestjs/common");
const operation_1 = require("../common/interface/operation");
let ParserService = class ParserService {
    isANumber(operating) {
        return ((operating != null) &&
            (operating !== '') &&
            !isNaN(Number(operating.toString())));
    }
    parseOperation(operation) {
        const operationItems = operation.operationText.split(",");
        if (operationItems.length !== 3) {
            return {
                operationType: operation_1.eOperationType.unkown,
                error: true,
                operating1: 0,
                operating2: 0,
                message: "should be 3 items."
            };
        }
        const operationType = this.getOperationType(operationItems[1]);
        if (operationType === operation_1.eOperationType.unkown) {
            return {
                operationType: operation_1.eOperationType.unkown,
                error: true,
                operating1: 0,
                operating2: 0,
                message: "Operation type unkown"
            };
        }
        if (!this.isANumber(operationItems[0]) || !this.isANumber(operationItems[2])) {
            return {
                operationType: operation_1.eOperationType.unkown,
                error: true,
                operating1: 0,
                operating2: 0,
                message: "Operatings are not a number"
            };
        }
        const operating1 = Number(operationItems[0]);
        const operating2 = Number(operationItems[2]);
        return {
            operationType,
            operating1,
            operating2,
            error: false,
            message: ""
        };
    }
    getOperationType(operationText) {
        switch (operationText) {
            case "+":
                return operation_1.eOperationType.addition;
            case "-":
                return operation_1.eOperationType.substraction;
            case "*":
                return operation_1.eOperationType.multiplication;
            case "/":
                return operation_1.eOperationType.division;
            default:
                return operation_1.eOperationType.unkown;
        }
    }
};
exports.ParserService = ParserService;
exports.ParserService = ParserService = __decorate([
    (0, common_1.Injectable)()
], ParserService);
//# sourceMappingURL=parser.service.js.map