import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713022829313 implements MigrationInterface {
    name = 'Migration1713022829313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "group_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ALTER COLUMN "group_name" SET NOT NULL`);
    }

}
