import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config';

import * as Entities from './entities';

const entities = Object.values(Entities);

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TypeOrmModule.forFeature(entities)]
})
export class DatabaseModule {}
