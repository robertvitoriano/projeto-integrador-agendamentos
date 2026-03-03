import { Post, HttpCode } from '@nestjs/common';
import { RabbitMQ } from 'RabbitMQ';

export class BuyConsumer {
  async consume() {
    const broker = await RabbitMQ.getInstance();

    const consumer = await broker.createConsumerChannel('queue-hello-world');

    consumer.consume((msg) => {
      if (!msg) return;
      consumer.ack(msg);
      console.log('COMPRA PROCESSADA POR RABBITMQ');
    });
  }
}
