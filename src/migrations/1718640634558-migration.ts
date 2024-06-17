import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718640634558 implements MigrationInterface {
    name = 'Migration1718640634558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "question"`);
        await queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "correct_answer"`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD "wordId" integer`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD CONSTRAINT "FK_f01c19287beec05c7c739a78c20" FOREIGN KEY ("wordId") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_item" DROP CONSTRAINT "FK_f01c19287beec05c7c739a78c20"`);
        await queryRunner.query(`ALTER TABLE "test_item" DROP COLUMN "wordId"`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD "correct_answer" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD "question" text NOT NULL`);
    }

}
