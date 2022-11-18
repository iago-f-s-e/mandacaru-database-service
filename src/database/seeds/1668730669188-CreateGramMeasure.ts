import { MigrationInterface, QueryRunner } from 'typeorm';
import { CookingMeasure } from '../entities';
import { gramMeasureFixture } from '../fixtures/gram-measure';

export class CreateGramMeasure1668730669188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(CookingMeasure, 'cooking-measure')
      .insert()
      .values(gramMeasureFixture)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(CookingMeasure, 'cooking-measure')
      .delete()
      .execute();
  }
}
