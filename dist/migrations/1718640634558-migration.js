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
exports.Migration1718640634558 = void 0;
class Migration1718640634558 {
    constructor() {
        this.name = 'Migration1718640634558';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "question"`);
            yield queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "correct_answer"`);
            yield queryRunner.query(`ALTER TABLE "test_item" ADD "wordId" integer`);
            yield queryRunner.query(`ALTER TABLE "test_item" ADD CONSTRAINT "FK_f01c19287beec05c7c739a78c20" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "test_item" DROP CONSTRAINT "FK_f01c19287beec05c7c739a78c20"`);
            yield queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "wordId"`);
            yield queryRunner.query(`ALTER TABLE "test_item" ADD "correct_answer" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "test_item" ADD "question" text NOT NULL`);
        });
    }
}
exports.Migration1718640634558 = Migration1718640634558;
//# sourceMappingURL=1718640634558-migration.js.map