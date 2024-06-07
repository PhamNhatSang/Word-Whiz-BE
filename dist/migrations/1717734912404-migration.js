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
exports.Migration1717734912404 = void 0;
class Migration1717734912404 {
    constructor() {
        this.name = 'Migration1717734912404';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "CHK_045ae04cb131e3a443198fe43d"`);
            yield queryRunner.query(`ALTER TABLE "course_rate" DROP COLUMN "rate"`);
            yield queryRunner.query(`ALTER TABLE "course_rate" ADD "rate" double precision NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "CHK_045ae04cb131e3a443198fe43d" CHECK ("rate" > 0 AND "rate" < 6)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "CHK_045ae04cb131e3a443198fe43d"`);
            yield queryRunner.query(`ALTER TABLE "course_rate" DROP COLUMN "rate"`);
            yield queryRunner.query(`ALTER TABLE "course_rate" ADD "rate" integer DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "CHK_045ae04cb131e3a443198fe43d" CHECK (((rate > 0) AND (rate < 6)))`);
        });
    }
}
exports.Migration1717734912404 = Migration1717734912404;
//# sourceMappingURL=1717734912404-migration.js.map