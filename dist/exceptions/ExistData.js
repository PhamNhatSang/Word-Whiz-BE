"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __importDefault(require("./BaseException"));
class ExistData extends BaseException_1.default {
    constructor(message, code) {
        super(message, code);
    }
}
exports.default = ExistData;
//# sourceMappingURL=ExistData.js.map