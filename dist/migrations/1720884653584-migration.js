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
exports.Migration1720884653584 = void 0;
class Migration1720884653584 {
    constructor() {
        this.name = 'Migration1720884653584';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "feed_back" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "userId" integer, "testId" integer, CONSTRAINT "PK_33a7f184e6be193bafb1dbc20c7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "feed_back" ADD CONSTRAINT "FK_2573929a556334405fbbcbc4676" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "feed_back" ADD CONSTRAINT "FK_ca6417b70dccfb9a25fbd4f628f" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "feed_back" DROP CONSTRAINT "FK_ca6417b70dccfb9a25fbd4f628f"`);
            yield queryRunner.query(`ALTER TABLE "feed_back" DROP CONSTRAINT "FK_2573929a556334405fbbcbc4676"`);
            yield queryRunner.query(`DROP TABLE "feed_back"`);
        });
    }
}
exports.Migration1720884653584 = Migration1720884653584;
//# sourceMappingURL=1720884653584-migration.js.map