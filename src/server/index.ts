import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { kafkaConnection } from '@src/infra/kafka/config';
import { PORT } from './settings';
import { InfraModule } from '@src/infra';

async function bootstrap(): Promise<any> { // eslint-disable-line 
  const app = await NestFactory.create(InfraModule);

  app.connectMicroservice(kafkaConnection);

  await app.startAllMicroservices();

  app.use(express.text());
  app.use(cors());
  app.use(helmet());

  return app.listen(PORT, () => {
    console.log('==============================');
    console.log(`Server running on port: ${PORT} =`);
    console.log('==============================');
  });
}

const server = { bootstrap };

export default server;
