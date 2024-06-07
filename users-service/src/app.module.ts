import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MongooseModule.forRoot("mongodb://127.0.0.1:27017", {
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
