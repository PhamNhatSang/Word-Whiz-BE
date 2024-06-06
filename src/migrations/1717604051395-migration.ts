import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717604051395 implements MigrationInterface {
    name = 'Migration1717604051395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
        await queryRunner.query(`CREATE TABLE "post_courses" ("post_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_99a324bad5f5e9f5b21e27c00e1" PRIMARY KEY ("post_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7ae8e75bd05eef2c52a8e206e8" ON "post_courses" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_640c57eb1cc88d0ca971e9c553" ON "post_courses" ("course_id") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_courses" ADD CONSTRAINT "FK_7ae8e75bd05eef2c52a8e206e8a" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_courses" ADD CONSTRAINT "FK_640c57eb1cc88d0ca971e9c5534" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_courses" DROP CONSTRAINT "FK_640c57eb1cc88d0ca971e9c5534"`);
        await queryRunner.query(`ALTER TABLE "post_courses" DROP CONSTRAINT "FK_7ae8e75bd05eef2c52a8e206e8a"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
        await queryRunner.query(`ALTER TABLE "react" DROP CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_640c57eb1cc88d0ca971e9c553"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ae8e75bd05eef2c52a8e206e8"`);
        await queryRunner.query(`DROP TABLE "post_courses"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "react" ADD CONSTRAINT "FK_71075bd5d1eb860ca13cb33f598" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
