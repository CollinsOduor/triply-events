import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class AppService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHello(): string {
    return 'Hello World from Users Service!';
  }

  async signUp(input: User){
    const user = new this.userModel(input);
    if (await this.userModel.findOne({username: input.username})){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: "Username already exists",
      }, HttpStatus.CONFLICT);
    }
    const createdUser = await user.save();
    return createdUser;
  }

  async updateUser(input: User){
    const user = await this.userModel.findOne({username: input.username});
    if (!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "User not found",
      }, HttpStatus.NOT_FOUND);
    }
    user.set(input);
    const updatedUser = await user.save();
    return updatedUser;
  }

  async login(input: User){ 
    const user = await this.userModel.findOne({username: input.username, password: input.password});
    return user;
  }
}
