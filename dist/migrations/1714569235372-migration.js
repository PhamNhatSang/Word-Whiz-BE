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
exports.Migration1714569235372 = void 0;
class Migration1714569235372 {
    constructor() {
        this.name = 'Migration1714569235372';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_dc9991ea6115b0b50c59806b4ed"`);
            yield queryRunner.query(`CREATE TABLE "group_students" ("group_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_b275e842fdf7699cd698eea28b0" PRIMARY KEY ("group_id", "user_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_8b5b7bb7e2c2f1a8e4319ae339" ON "group_students" ("group_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_2438138dd956eae5d416090323" ON "group_students" ("user_id") `);
            yield queryRunner.query(`CREATE TABLE "group_courses" ("group_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_61fadb699560bc496cec3effb53" PRIMARY KEY ("group_id", "course_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_bb848e3ef4a3c59bdafa0fb64c" ON "group_courses" ("group_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_23a589dca6c43d006ddf570a98" ON "group_courses" ("course_id") `);
            yield queryRunner.query(`CREATE TABLE "course_imports" ("courses" integer NOT NULL, "users" integer NOT NULL, CONSTRAINT "PK_120cfeaf4c7842479487a12aa86" PRIMARY KEY ("courses", "users"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_3b3b6771b1a8d08f43764313c4" ON "course_imports" ("courses") `);
            yield queryRunner.query(`CREATE INDEX "IDX_2700f18cd0510e4d36ee30e391" ON "course_imports" ("users") `);
            yield queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "is_creadted"`);
            yield queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "REL_dc9991ea6115b0b50c59806b4e"`);
            yield queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "testId"`);
            yield queryRunner.query(`ALTER TABLE "tests" ADD "userId" integer`);
            yield queryRunner.query(`ALTER TABLE "tests" ADD "courseId" integer`);
            yield queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_9b4193834978a419a4d477940da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_79f0ccaf8e323c2e8ea65ca5f54" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_2438138dd956eae5d4160903236" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_23a589dca6c43d006ddf570a98f" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49" FOREIGN KEY ("courses") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919" FOREIGN KEY ("users") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919"`);
            yield queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49"`);
            yield queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_23a589dca6c43d006ddf570a98f"`);
            yield queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3"`);
            yield queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_2438138dd956eae5d4160903236"`);
            yield queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394"`);
            yield queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_79f0ccaf8e323c2e8ea65ca5f54"`);
            yield queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_9b4193834978a419a4d477940da"`);
            yield queryRunner.query(`ALTER TABLE "tests" DROP COLUMN "courseId"`);
            yield queryRunner.query(`ALTER TABLE "tests" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "courses" ADD "testId" integer`);
            yield queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "REL_dc9991ea6115b0b50c59806b4e" UNIQUE ("testId")`);
            yield queryRunner.query(`ALTER TABLE "courses" ADD "is_creadted" boolean NOT NULL`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_2700f18cd0510e4d36ee30e391"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_3b3b6771b1a8d08f43764313c4"`);
            yield queryRunner.query(`DROP TABLE "course_imports"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_23a589dca6c43d006ddf570a98"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_bb848e3ef4a3c59bdafa0fb64c"`);
            yield queryRunner.query(`DROP TABLE "group_courses"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_2438138dd956eae5d416090323"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_8b5b7bb7e2c2f1a8e4319ae339"`);
            yield queryRunner.query(`DROP TABLE "group_students"`);
            yield queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_dc9991ea6115b0b50c59806b4ed" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.Migration1714569235372 = Migration1714569235372;
//# sourceMappingURL=1714569235372-migration.js.map