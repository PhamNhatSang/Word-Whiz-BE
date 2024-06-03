import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717435646041 implements MigrationInterface {
    name = 'Migration1717435646041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "score" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ALTER COLUMN "score" SET DEFAULT '-1'`);
    }

}
