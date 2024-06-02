import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717350373687 implements MigrationInterface {
    name = 'Migration1717350373687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" RENAME COLUMN "is_first_done" TO "is_done"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" RENAME COLUMN "is_done" TO "is_first_done"`);
    }

}
