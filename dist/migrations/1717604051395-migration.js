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
exports.Migration1717604051395 = void 0;
class Migration1717604051395 {
    constructor() {
        this.name = 'Migration1717604051395';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
            yield queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598"`);
            yield queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
            yield queryRunner.query(`CREATE TABLE "post_courses" ("post_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_99a324bad5f5e9f5b21e27c00e1" PRIMARY KEY ("post_id", "course_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_7ae8e75bd05eef2c52a8e206e8" ON "post_courses" ("post_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_640c57eb1cc88d0ca971e9c553" ON "post_courses" ("course_id") `);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "post_courses" ADD CONSTRAINT "FK_7ae8e75bd05eef2c52a8e206e8a" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "post_courses" ADD CONSTRAINT "FK_640c57eb1cc88d0ca971e9c5534" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "post_courses" DROP CONSTRAINT "FK_640c57eb1cc88d0ca971e9c5534"`);
            yield queryRunner.query(`ALTER TABLE "post_courses" DROP CONSTRAINT "FK_7ae8e75bd05eef2c52a8e206e8a"`);
            yield queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
            yield queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_640c57eb1cc88d0ca971e9c553"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7ae8e75bd05eef2c52a8e206e8"`);
            yield queryRunner.query(`DROP TABLE "post_courses"`);
            yield queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.Migration1717604051395 = Migration1717604051395;
//# sourceMappingURL=1717604051395-migration.js.map