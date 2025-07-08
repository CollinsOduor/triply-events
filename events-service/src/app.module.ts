import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schema/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]), MongooseModule.forRoot("mongodb://127.0.0.1:27018", {
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
