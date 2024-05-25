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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
require("reflect-metadata");
const database_1 = require("../../database");
class BaseService {
    constructor() {
        this.manager = database_1.manager;
    }
    create(entity, entityData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.getRepository(entity).save(entityData);
        });
    }
    update(entity, entityData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.getRepository(entity).save(entityData);
        });
    }
    delete(entity, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.manager.getRepository(entity).delete({ id: id });
        });
    }
    getAll(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.find(entity);
        });
    }
    getById(entity, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.manager.findOne(entity, id);
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map