import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720798677313 implements MigrationInterface {
    name = 'Migration1720798677313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_group" RENAME COLUMN "group_name" TO "testName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_group" RENAME COLUMN "testName" TO "group_name"`);
    }

}
