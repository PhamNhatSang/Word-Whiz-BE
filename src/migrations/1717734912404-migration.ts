import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717734912404 implements MigrationInterface {
    name = 'Migration1717734912404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "CHK_045ae04cb131e3a443198fe43d"`);
        await queryRunner.query(`ALTER TABLE "course_rate" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD "rate" double precision NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "CHK_045ae04cb131e3a443198fe43d" CHECK ("rate" > 0 AND "rate" < 6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_rate" DROP CONSTRAINT "CHK_045ae04cb131e3a443198fe43d"`);
        await queryRunner.query(`ALTER TABLE "course_rate" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD "rate" integer DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "course_rate" ADD CONSTRAINT "CHK_045ae04cb131e3a443198fe43d" CHECK (((rate > 0) AND (rate < 6)))`);
    }

}
