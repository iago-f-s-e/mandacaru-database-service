import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1659061451219 implements MigrationInterface {
    name = 'Database1659061451219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "payment_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'in-person',
                CONSTRAINT "UQ_06a96865bf0d5a224c8dc13c653" UNIQUE ("name"),
                CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_payment_name" ON "payment" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_payment_type" ON "payment" ("type")
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "product_id" uuid NOT NULL,
                "name" character varying(100) NOT NULL,
                "type" character varying(50) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
                CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_product_name" ON "product" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_product_is_active" ON "product" ("is_active")
        `);
        await queryRunner.query(`
            CREATE TABLE "score" (
                "score_id" uuid NOT NULL,
                "user_id" uuid,
                "market_id" uuid,
                "producer_product_id" uuid,
                "transactions" integer NOT NULL DEFAULT '0',
                "rating" double precision NOT NULL DEFAULT '0',
                "ratingQuantity" integer NOT NULL DEFAULT '0',
                "totalRating" integer NOT NULL DEFAULT '0',
                CONSTRAINT "REL_0b3074ecc6d93b5f0974a83441" UNIQUE ("user_id"),
                CONSTRAINT "REL_9bf782a7cc432ed72971806e47" UNIQUE ("market_id"),
                CONSTRAINT "REL_feee02a6709e185f46612e3eb6" UNIQUE ("producer_product_id"),
                CONSTRAINT "PK_757ddc90313d9e3cf1f49d6857a" PRIMARY KEY ("score_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "unit_measure" (
                "unit_measure_id" uuid NOT NULL,
                "name" character varying(50) NOT NULL,
                "abbreviation" character varying(10) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_3c3be7a68da958f117b88427187" UNIQUE ("name"),
                CONSTRAINT "UQ_44ed22e0844941b4697ce9418e5" UNIQUE ("abbreviation"),
                CONSTRAINT "PK_9eabff1fbf369933b1fcee9caac" PRIMARY KEY ("unit_measure_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_name" ON "unit_measure" ("name")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_abbreviation" ON "unit_measure" ("abbreviation")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_unit_measure_is_active" ON "unit_measure" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_abbreviation_name" ON "unit_measure" ("name", "abbreviation")
        `);
        await queryRunner.query(`
            CREATE TABLE "producer_product" (
                "producer_product_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                "producer_id" uuid NOT NULL,
                "unit_measure_id" uuid NOT NULL,
                "price" double precision NOT NULL,
                "stock" double precision NOT NULL,
                "harvest_date" date NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_4397e02b37363d30b3daae8c1ff" PRIMARY KEY ("producer_product_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_producer_product_is_active" ON "producer_product" ("is_active")
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction-product" (
                "transaction_product_id" uuid NOT NULL,
                "transaction_id" uuid NOT NULL,
                "producer_product_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                "total" double precision NOT NULL,
                CONSTRAINT "PK_ce04430a66074435ace998a1c88" PRIMARY KEY ("transaction_product_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "transaction_id" uuid NOT NULL,
                "number" BIGSERIAL NOT NULL,
                "consumer_id" uuid NOT NULL,
                "producer_id" uuid NOT NULL,
                "payment_id" uuid NOT NULL,
                "selected_day_id" uuid,
                "market_id" uuid,
                "address_id" uuid,
                "total" double precision NOT NULL,
                "product_quantity" integer NOT NULL,
                "type" character varying NOT NULL,
                "status" character varying NOT NULL DEFAULT 'waiting-for-confirmation-from-the-producer',
                "description" character varying,
                "observation" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_transaction_number" ON "transaction" ("number")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_transaction_type" ON "transaction" ("type")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_transaction_status" ON "transaction" ("status")
        `);
        await queryRunner.query(`
            CREATE TABLE "workday" (
                "workday_id" uuid NOT NULL,
                "market_id" uuid NOT NULL,
                "weekday" character varying NOT NULL,
                "opening" character varying NOT NULL,
                "closing" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_d8c90e83b6e0384eb96e72d2ee1" PRIMARY KEY ("workday_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_workday_is_active" ON "workday" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_market_weekday" ON "workday" ("market_id", "weekday")
        `);
        await queryRunner.query(`
            CREATE TABLE "market" (
                "market_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_1a8068c93b7b3b7f483268ea117" PRIMARY KEY ("market_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_market_is_active" ON "market" ("is_active")
        `);
        await queryRunner.query(`
            CREATE TABLE "producer_market" (
                "producer_id" uuid NOT NULL,
                "market_id" uuid NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_7324b6159aa457c8e4ded6da544" PRIMARY KEY ("producer_id", "market_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_producer_market_is_active" ON "producer_market" ("is_active")
        `);
        await queryRunner.query(`
            CREATE TABLE "property" (
                "property_id" uuid NOT NULL,
                "producer_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_5dedb31d883f351fc101febc7c1" PRIMARY KEY ("property_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_property_is_active" ON "property" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_producer_property_name" ON "property" ("name", "producer_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "producer" (
                "producer_id" uuid NOT NULL,
                "make_delivery" boolean NOT NULL DEFAULT false,
                "status" character varying NOT NULL DEFAULT 'PENDING',
                "certification_type" character varying NOT NULL DEFAULT 'IN CONVERSION',
                CONSTRAINT "REL_626f808e3dff8f607304175673" UNIQUE ("producer_id"),
                CONSTRAINT "PK_626f808e3dff8f6073041756736" PRIMARY KEY ("producer_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL,
                "name" character varying(150) NOT NULL,
                "phone" character varying(11) NOT NULL,
                "email" character varying(100) NOT NULL,
                "document" character varying(14) NOT NULL,
                "password" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14" UNIQUE ("document"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_phone" ON "user" ("phone")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_document" ON "user" ("document")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_user_is_active" ON "user" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_phone_email_document" ON "user" ("phone", "email", "document")
        `);
        await queryRunner.query(`
            CREATE TABLE "address" (
                "address_id" uuid NOT NULL,
                "user_id" uuid,
                "market_id" uuid,
                "property_id" uuid,
                "state" character varying(35) NOT NULL,
                "city" character varying(58) NOT NULL,
                "district" character varying(50) NOT NULL,
                "street" character varying(100),
                "zip_code" character varying(9),
                "complement" character varying(30),
                "lat" character varying(30),
                "long" character varying(30),
                "number" character varying,
                CONSTRAINT "REL_2da624cf0abb585d301991e23c" UNIQUE ("market_id"),
                CONSTRAINT "REL_7a756103194bdafc8e2fc20060" UNIQUE ("property_id"),
                CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_market_address" ON "address" ("market_id")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_property_address" ON "address" ("property_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_0b3074ecc6d93b5f0974a834416" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_9bf782a7cc432ed72971806e473" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_feee02a6709e185f46612e3eb64" FOREIGN KEY ("producer_product_id") REFERENCES "producer_product"("producer_product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_d19e952c391e3a1044ed21a89e3" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measure"("unit_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_dcdaf3c2260f1c065d14a52f544" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product"
            ADD CONSTRAINT "FK_5034d3c96745310dcaf233ac19a" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product"
            ADD CONSTRAINT "FK_1953727aaf08bbffc38fb52ea86" FOREIGN KEY ("producer_product_id") REFERENCES "producer_product"("producer_product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_2285b911ae40ffa022e1e89ac1f" FOREIGN KEY ("consumer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_44af915369fd5e0341ac72cffa7" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_87d332611ebc2beababe8dc4d18" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_ad89e073f3af18bfce77743960c" FOREIGN KEY ("selected_day_id") REFERENCES "workday"("workday_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_bcaea95123d1e8248a3129ac39d" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_db254bac06d7e6099a5024b33a7" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "workday"
            ADD CONSTRAINT "FK_d80f26fcc57f1e83e72c07d8f4d" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market"
            ADD CONSTRAINT "FK_9f019dbdb088f0f3d7be793c727" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market"
            ADD CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "property"
            ADD CONSTRAINT "FK_152068877b8fe9d854444f4237a" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_2da624cf0abb585d301991e23cf" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_7a756103194bdafc8e2fc20060d" FOREIGN KEY ("property_id") REFERENCES "property"("property_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_7a756103194bdafc8e2fc20060d"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_2da624cf0abb585d301991e23cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "property" DROP CONSTRAINT "FK_152068877b8fe9d854444f4237a"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market" DROP CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market" DROP CONSTRAINT "FK_9f019dbdb088f0f3d7be793c727"
        `);
        await queryRunner.query(`
            ALTER TABLE "workday" DROP CONSTRAINT "FK_d80f26fcc57f1e83e72c07d8f4d"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_db254bac06d7e6099a5024b33a7"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_bcaea95123d1e8248a3129ac39d"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_ad89e073f3af18bfce77743960c"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_87d332611ebc2beababe8dc4d18"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_44af915369fd5e0341ac72cffa7"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_2285b911ae40ffa022e1e89ac1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product" DROP CONSTRAINT "FK_1953727aaf08bbffc38fb52ea86"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product" DROP CONSTRAINT "FK_5034d3c96745310dcaf233ac19a"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_dcdaf3c2260f1c065d14a52f544"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_d19e952c391e3a1044ed21a89e3"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_feee02a6709e185f46612e3eb64"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_9bf782a7cc432ed72971806e473"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_0b3074ecc6d93b5f0974a834416"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_property_address"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_market_address"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_phone_email_document"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_document"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_email"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_phone"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "producer"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_producer_property_name"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_property_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "property"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_producer_market_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "producer_market"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_market_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "market"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_market_weekday"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_workday_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "workday"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_status"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_type"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_number"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction-product"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_producer_product_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "producer_product"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_abbreviation_name"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_abbreviation"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_name"
        `);
        await queryRunner.query(`
            DROP TABLE "unit_measure"
        `);
        await queryRunner.query(`
            DROP TABLE "score"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_product_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_product_name"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_payment_type"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_payment_name"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
    }

}
