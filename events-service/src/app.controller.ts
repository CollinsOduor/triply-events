import { Controller, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Response as CustomResponse } from './schema/response.schema';
import { Event } from './schema/event.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('get_hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('createEvent')
  async createEvent(data: Event): Promise<CustomResponse> {
    const eventObj = await this.appService.createEvent(data);
    if (eventObj) {
      return {status: HttpStatus.CREATED, data: eventObj, message: "Event created successfully"}
    }
    return {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "A problem occurred while creating the event", data: null}
  }

  @EventPattern('updateEvent')
  async updateEvent(data: Event): Promise<CustomResponse> {
    const eventObj = await this.appService.updateEvent(data);
    if (eventObj) {
      return {status: HttpStatus.OK, data: eventObj, message: "Event updated successfully"}
    }
    return {status: HttpStatus.INTERNAL_SERVER_ERROR, message: "A problem occurred while updating the event", data: null}
  }
}
