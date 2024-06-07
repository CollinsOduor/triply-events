import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Sign } from 'crypto';
import { LoginInput, UserSignupInput } from './inputs/user.input';
import { catchError, firstValueFrom, lastValueFrom, of } from 'rxjs';
import { User } from './schema/user.schema';
import { Response as CustomResponse } from './schema/response.schema';
import { EventCreationInput } from './inputs/event.input';



@Injectable()
export class AppService {

  constructor(
    @Inject ("EVENTS_SERVICE") private readonly eventsClient: ClientProxy,
    @Inject ("PAYMENT_SERVICE") private readonly paymentsClient: ClientProxy,
    @Inject ("USERS_SERVICE") private readonly usersClient: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    const response = await lastValueFrom(this.eventsClient.send('get_hello', {}));
    return response;
  }

  testEvent(){
    this.paymentsClient.emit('event_name', {data: 'test'});
  }

  async signUp(input: UserSignupInput): Promise<CustomResponse>{
    const response: CustomResponse = await lastValueFrom(this.usersClient.send('signUp', input));
    if (response.status === 201) {
      return response;
    }
    return {status: 500, message: "A problem occurred while creating the user", data: null};
  }


  async login(input: LoginInput): Promise<CustomResponse>{
    const response: User = await lastValueFrom(this.usersClient.send('login', input));
    if (response) {
      return {status: 200, data: response, message: "Operation was successful"};
    }
    return {status: 404, message: "Either the username or password is wrong", data: null};
  }

  async createEvent(input: EventCreationInput): Promise<CustomResponse>{
    const response: Event = await lastValueFrom(this.eventsClient.send('createEvent', input));
    if (response) {
      return {status: 201, data: response, message: "Event created successfully"};
    }
    throw new HttpException("An error occurred while creating the event", 500);
  }

  async updateEvent(input: EventCreationInput): Promise<CustomResponse>{
    const response: Event = await lastValueFrom(this.eventsClient.send('updateEvent', input));
    if (response) {
      return {status: 200, data: response, message: "Event updated successfully"};
    }
    throw new HttpException("An error occurred while updating the event", 500);
  }
}
