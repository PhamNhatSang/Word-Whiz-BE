import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717653599927 implements MigrationInterface {
    name = 'Migration1717653599927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "react" ALTER COLUMN "emotion" SET DEFAULT 'LIKE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "react" ALTER COLUMN "emotion" SET DEFAULT 'NONE'`);
    }

}
