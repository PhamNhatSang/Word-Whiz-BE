import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717326418732 implements MigrationInterface {
    name = 'Migration1717326418732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_item" DROP CONSTRAINT "FK_7064d12473e33fe92164d07a7ce"`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD CONSTRAINT "FK_7064d12473e33fe92164d07a7ce" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_item" DROP CONSTRAINT "FK_7064d12473e33fe92164d07a7ce"`);
        await queryRunner.query(`ALTER TABLE "test_item" ADD CONSTRAINT "FK_7064d12473e33fe92164d07a7ce" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
