import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719579133924 implements MigrationInterface {
    name = 'Migration1719579133924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "language" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "language" DROP NOT NULL`);
    }

}
