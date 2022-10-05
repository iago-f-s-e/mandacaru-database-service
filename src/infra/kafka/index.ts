import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaConnection } from './config';

@Module({
  imports: [ClientsModule.register([kafkaConnection])]
})
export class KafkaModule {}
