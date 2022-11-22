import { MigrationInterface, QueryRunner } from 'typeorm';

export class Assessment1669083021547 implements MigrationInterface {
  name = 'Assessment1669083021547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "assessment" (
                "assessment_id" uuid NOT NULL,
                "subject_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "assessment_day" character varying(9) NOT NULL,
                "assessment_date" date NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_79b93d2bb56f37e75b533fa988a" PRIMARY KEY ("assessment_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_assessment_day" ON "assessment" ("assessment_day")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_assessment_date" ON "assessment" ("assessment_date")
        `);
    await queryRunner.query(`
            CREATE TABLE "assessment_meal" (
                "assessment_meal_id" uuid NOT NULL,
                "assessment_id" uuid NOT NULL,
                "aliment_measure_id" uuid NOT NULL,
                "assessment_meal_type" character varying(14) NOT NULL,
                "assessment_meal_time" TIME NOT NULL,
                "quantity" double precision NOT NULL,
                "place" character varying,
                "brand" character varying,
                CONSTRAINT "PK_74c837c72c890742e48cea0a78b" PRIMARY KEY ("assessment_meal_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_assessment_meal_type" ON "assessment_meal" ("assessment_meal_type")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_assessment_meal_time" ON "assessment_meal" ("assessment_meal_time")
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
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
    await queryRunner.query(`
            ALTER TABLE "aliment"
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
            ALTER TABLE "assessment"
            ADD CONSTRAINT "FK_6760756ab66e441733bf0a81f64" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment"
            ADD CONSTRAINT "FK_5f562499b9b7c251815f6e14dfe" FOREIGN KEY ("subject_id") REFERENCES "subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment_meal"
            ADD CONSTRAINT "FK_10344e6a979272907a67b481c6e" FOREIGN KEY ("assessment_id") REFERENCES "assessment"("assessment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment_meal"
            ADD CONSTRAINT "FK_33fc2070832ba5ccbfaab0bf24a" FOREIGN KEY ("aliment_measure_id") REFERENCES "aliment_measure"("aliment_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "assessment_meal" DROP CONSTRAINT "FK_33fc2070832ba5ccbfaab0bf24a"
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment_meal" DROP CONSTRAINT "FK_10344e6a979272907a67b481c6e"
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment" DROP CONSTRAINT "FK_5f562499b9b7c251815f6e14dfe"
        `);
    await queryRunner.query(`
            ALTER TABLE "assessment" DROP CONSTRAINT "FK_6760756ab66e441733bf0a81f64"
        `);
    await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "cooking_measure"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "subject"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "aliment"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "composition"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "reference"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            ALTER TABLE "nutrient"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-11-18 01:12:07.335871'
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_assessment_meal_time"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_assessment_meal_type"
        `);
    await queryRunner.query(`
            DROP TABLE "assessment_meal"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_assessment_date"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_assessment_day"
        `);
    await queryRunner.query(`
            DROP TABLE "assessment"
        `);
  }
}
