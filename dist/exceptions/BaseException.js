"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseException extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = BaseException;
//# sourceMappingURL=BaseException.js.map