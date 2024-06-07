import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  username: string

  @Prop()
  phoneNumber: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  dateOfBirth: Date

  @Prop()
  email: string

  @Prop()
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)