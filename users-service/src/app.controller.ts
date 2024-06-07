import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('get_hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('signUp')
  async signUp(data: User) {
    const userObj = await this.appService.signUp(data);
    if (userObj) {
      return {status: HttpStatus.CREATED, data: userObj, message: "User created successfully"}
    }
    return {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "A problem occurred while creating the user"}
  }

  @EventPattern('login')
  async login(data: User) {
    const userObj = await this.appService.login(data);
    if (userObj) {
      return userObj
    }
    return null;
  }
}
