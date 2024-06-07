import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<Event>

@Schema({ collection: 'events', timestamps: true })
export class Event {
  @Prop()
  name: string

  @Prop()
  organizer_id: string

  @Prop()
  price: string

  @Prop()
  seats: number

  @Prop()
  date: Date

  @Prop()
    location: string

    @Prop()
    _id: string
}

export const EventSchema = SchemaFactory.createForClass(Event)