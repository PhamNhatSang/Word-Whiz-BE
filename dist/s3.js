"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectSignedUrl = exports.deleteFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3Client = new client_s3_1.S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
function uploadFile(fileBuffer, mimetype) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageName = crypto_1.default.randomBytes(32).toString('hex');
        const uploadParams = {
            Bucket: bucketName,
            Body: fileBuffer,
            Key: imageName,
            ContentType: mimetype
        };
        yield s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
        return imageName;
    });
}
exports.uploadFile = uploadFile;
function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };
    return s3Client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
}
exports.deleteFile = deleteFile;
function getObjectSignedUrl(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: bucketName,
            Key: key
        };
        const command = new client_s3_1.GetObjectCommand(params);
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 3600 });
        return url;
    });
}
exports.getObjectSignedUrl = getObjectSignedUrl;
//# sourceMappingURL=s3.js.map