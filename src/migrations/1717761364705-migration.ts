import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717761364705 implements MigrationInterface {
    name = 'Migration1717761364705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "image" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "image" character varying NOT NULL`);
    }

}
