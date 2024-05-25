import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716620968711 implements MigrationInterface {
    name = 'Migration1716620968711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "score" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "score" DROP DEFAULT`);
    }

}
