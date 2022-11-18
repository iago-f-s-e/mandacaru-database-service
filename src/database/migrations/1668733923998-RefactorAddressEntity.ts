import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorAddressEntity1668733923998 implements MigrationInterface {
    name = 'RefactorAddressEntity1668733923998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD "lat" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD "long" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:01:36.806924'
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP COLUMN "long"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP COLUMN "lat"
        `);
    }

}
