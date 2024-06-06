"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMidleware = void 0;
const multer_1 = __importDefault(require("multer"));
class UploadMidleware {
    use(request, response, next) {
        const storage = multer_1.default.memoryStorage();
        const upload = (0, multer_1.default)({ storage: storage });
        const single = upload.single('file');
        single(request, response, (err) => {
            if (err) {
                return response.status(400).json({ message: err.message });
            }
            next();
        });
    }
}
exports.UploadMidleware = UploadMidleware;
//# sourceMappingURL=upload.middleware.js.map