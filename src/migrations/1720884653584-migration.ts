import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720884653584 implements MigrationInterface {
    name = 'Migration1720884653584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feed_back" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "userId" integer, "testId" integer, CONSTRAINT "PK_33a7f184e6be193bafb1dbc20c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "feed_back" ADD CONSTRAINT "FK_2573929a556334405fbbcbc4676" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "feed_back" ADD CONSTRAINT "FK_ca6417b70dccfb9a25fbd4f628f" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feed_back" DROP CONSTRAINT "FK_ca6417b70dccfb9a25fbd4f628f"`);
        await queryRunner.query(`ALTER TABLE "feed_back" DROP CONSTRAINT "FK_2573929a556334405fbbcbc4676"`);
        await queryRunner.query(`DROP TABLE "feed_back"`);
    }

}
