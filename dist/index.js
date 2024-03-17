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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const database_1 = require("./database");
const instanceConnectionName = process.env.CLOUD_INSTANCE || '';
const username = process.env.DB_USERNAME || '';
const databaseName = process.env.DB_NAME || '';
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, database_1.createDatabase)({ instanceConnectionName, username, databaseName });
        console.log(database);
        app.get('/', (_req, res) => {
            console.log('Request received');
            return res.send('Request received');
        });
        app.get('/ping', (_req, res) => {
            return res.send('pong 🏓');
        });
        app.listen(port, () => {
            return console.log(`Server is listening on ${port}`);
        });
    });
}
startServer().then(() => {
    console.log('Server started');
}).catch((err) => {
    console.error('Error starting server', err);
});
//# sourceMappingURL=index.js.map