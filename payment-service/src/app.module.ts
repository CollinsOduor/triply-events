import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]), MongooseModule.forRoot("mongodb://127.0.0.1:27018", {
    dbName: "triply",
    auth: {
      username: "root",
      password: "toor",
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
