import { Module } from '@nestjs/common';
import { ContainerModule } from './container';
import { DatabaseModule } from './database';
import { KafkaModule } from './kafka';

@Module({
  imports: [DatabaseModule, KafkaModule, ContainerModule],
  exports: [DatabaseModule, KafkaModule, ContainerModule]
})
export class InfraModule {}
