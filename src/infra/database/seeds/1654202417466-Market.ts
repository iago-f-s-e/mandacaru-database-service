import { MigrationInterface, QueryRunner } from 'typeorm';
import { Address, Market, Score, Workday } from '../entities';
import { marketFixtures } from '../fixtures';

export class Market1654202417466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const markets = marketFixtures.market as unknown as Market[];
    const address = marketFixtures.address as unknown as Address[];
    const workDay = marketFixtures.workDay as unknown as Workday[];
    const score = marketFixtures.score as unknown as Score[];

    await queryRunner.connection
      .createQueryBuilder(Market, 'market')
      .insert()
      .values(markets)
      .execute();

    await queryRunner.connection
      .createQueryBuilder(Address, 'address')
      .insert()
      .values(address)
      .execute();

    await queryRunner.connection
      .createQueryBuilder(Workday, 'workday')
      .insert()
      .values(workDay)
      .execute();

    await queryRunner.connection
      .createQueryBuilder(Score, 'score')
      .insert()
      .values(score)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Score, 'score').delete().execute();
    await queryRunner.connection.createQueryBuilder(Workday, 'workday').delete().execute();
    await queryRunner.connection.createQueryBuilder(Address, 'address').delete().execute();
    await queryRunner.connection.createQueryBuilder(Market, 'market').delete().execute();
  }
}
