import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

import { User } from "./users.schema";
import { Event } from "./events.schema";

export type UserDocument = HydratedDocument<Event>

@Schema({ collection: 'payments', timestamps: true })

export class Payment {
    @Prop()
    user: User;

    @Prop()
    event: Event;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)