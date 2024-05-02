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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, routing_controllers_1.useExpressServer)(app, {
    cors: true,
    routePrefix: '/api',
    controllers: [path_1.default.join(__dirname + '/controllers/*.controller.{js,ts}')],
    middlewares: [path_1.default.join(__dirname + '/middlewares/*.middleware.{js,ts}')],
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.database.initialize();
    return console.log(`Server is listening on ${port}`);
}));
//# sourceMappingURL=index.js.map