import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schema/event.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}
  getHello(): string {
    return 'Hello World from Events!';
  }


async createEvent(data: Event): Promise<Event> {
  const event = new this.eventModel(data);
  // Check if event with the same name, organizerId and date already exists
  if (await this.eventModel.findOne({name: data.name, organizerId: data.organizer_id, date: data.date})){
    return null;
  }
  const createdEvent = await event.save();
  return createdEvent;
}

async updateEvent(data: Event): Promise<Event> {
  const event = await this.eventModel.findOne({_id: data._id});
  if (!event){
    return null;
  }
  event.set(data);
  const updatedEvent = await event.save();
  return updatedEvent;
}
}