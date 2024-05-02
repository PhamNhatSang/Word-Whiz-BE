import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714646625252 implements MigrationInterface {
    name = 'Migration1714646625252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49"`);
        await queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_2438138dd956eae5d4160903236"`);
        await queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3"`);
        await queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_23a589dca6c43d006ddf570a98f"`);
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "term" character varying NOT NULL, "definition" text NOT NULL, "example" text, "explanation" text, "image" character varying, "courseId" integer, CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "question" text NOT NULL, "option_1" text NOT NULL, "option_2" text NOT NULL, "option_3" text NOT NULL, "option_4" text NOT NULL, "correct_answer" text NOT NULL, "testId" integer, CONSTRAINT "PK_8de2e511c6077fbe5b83921be03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL, "is_first_done" boolean NOT NULL DEFAULT false, "userId" integer, "courseId" integer, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_rate" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rate" integer NOT NULL, "courseId" integer, "userId" integer, CONSTRAINT "PK_d2f3fb748416df579cc1401fab5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."course_accessiblity_enum" AS ENUM('PUBLIC', 'PRIVATE')`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text NOT NULL, "accessiblity" "public"."course_accessiblity_enum" NOT NULL DEFAULT 'PUBLIC', "ownerId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "group_name" character varying, "group_description" character varying, "ownerId" integer, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."react_emotion_enum" AS ENUM('LIKE', 'SAD', 'HAHA', 'WOW', 'LOVE', 'ANGRY', 'NONE')`);
        await queryRunner.query(`CREATE TABLE "react" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "emotion" "public"."react_emotion_enum" NOT NULL DEFAULT 'NONE', "userId" integer, "postId" integer, CONSTRAINT "PK_6ee31cceec7615f2d469fa8ba71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "image" character varying NOT NULL, "ownerId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'STUDENT', 'TEACHER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'STUDENT', "refeshToken" character varying, "avatar" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "word" ADD CONSTRAINT "FK_0ae86ce0ca85748bfa0d057f5d4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD CONSTRAINT "FK_7064d12473e33fe92164d07a7ce" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_394889f330e608a61edd1163cdf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_ba764edd9bdece337a83c2be4f0" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "FK_1676a81eacfc2ccfaed16577d44" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "FK_9835e01d6986dea4262aae2792d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_ebf0ff6d5d6aeaa87d9b4b29c0c" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af997e6623c9a0e27c241126988" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_41697ba54bd2df09177c8bb4f62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49" FOREIGN KEY ("courses") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919" FOREIGN KEY ("users") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_2438138dd956eae5d4160903236" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_23a589dca6c43d006ddf570a98f" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_23a589dca6c43d006ddf570a98f"`);
        await queryRunner.query(`ALTER TABLE "group_courses" DROP CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_2438138dd956eae5d4160903236"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394"`);
        await queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919"`);
        await queryRunner.query(`ALTER TABLE "course_imports" DROP CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_41697ba54bd2df09177c8bb4f62"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af997e6623c9a0e27c241126988"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_ebf0ff6d5d6aeaa87d9b4b29c0c"`);
        await queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "FK_9835e01d6986dea4262aae2792d"`);
        await queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "FK_1676a81eacfc2ccfaed16577d44"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_ba764edd9bdece337a83c2be4f0"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_394889f330e608a61edd1163cdf"`);
        await queryRunner.query(`ALTER TABLE "test_item" DROP CONSTRAINT "FK_7064d12473e33fe92164d07a7ce"`);
        await queryRunner.query(`ALTER TABLE "word" DROP CONSTRAINT "FK_0ae86ce0ca85748bfa0d057f5d4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "react"`);
        await queryRunner.query(`DROP TYPE "public"."react_emotion_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TYPE "public"."course_accessiblity_enum"`);
        await queryRunner.query(`DROP TABLE "course_rate"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "test_item"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_23a589dca6c43d006ddf570a98f" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_courses" ADD CONSTRAINT "FK_bb848e3ef4a3c59bdafa0fb64c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_2438138dd956eae5d4160903236" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_8b5b7bb7e2c2f1a8e4319ae3394" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_2700f18cd0510e4d36ee30e3919" FOREIGN KEY ("users") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_imports" ADD CONSTRAINT "FK_3b3b6771b1a8d08f43764313c49" FOREIGN KEY ("courses") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
