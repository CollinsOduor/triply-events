import { Body, Controller, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginInput, UserSignupInput } from './inputs/user.input';
import { Response as CustomResponse } from './schema/response.schema';
import { EventCreationInput, EventModificationInput } from './inputs/event.input';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const response = await this.appService.getHello();
    return response;
  }

  @Post("/signup")
  async signUp(@Body() input: UserSignupInput): Promise<CustomResponse>  {
    const response: CustomResponse = await this.appService.signUp(input);
    if (response.status === HttpStatus.CREATED) {
      return response;
    }
    throw new HttpException(response.message, response.status);
  }

  

  @Post("/login")
  async login(@Body() input: LoginInput): Promise<CustomResponse> {
    const response: CustomResponse = await this.appService.login(input);
    if (response.status === HttpStatus.OK) {
      return response;
    }
    throw new HttpException(response.message, response.status);
  }


  @Post("/events")
  async createEvent(@Body() input: EventCreationInput): Promise<CustomResponse> {
    const response: CustomResponse = await this.appService.createEvent(input);
    if (response.status === HttpStatus.CREATED) {
      return response;
    }
    throw new HttpException(response.message, response.status);
  }

  @Put("/events/:id")
  async updateEvent(@Body() input: EventModificationInput): Promise<CustomResponse> {
    const response: CustomResponse = await this.appService.updateEvent(input);
    if (response.status === HttpStatus.OK) {
      return response;
    }
    throw new HttpException(response.message, response.status);
  }

}
