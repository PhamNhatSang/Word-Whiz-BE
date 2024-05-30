import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717073033103 implements MigrationInterface {
    name = 'Migration1717073033103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ADD "group_code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "group_code"`);
    }

}
