import { OmitType } from '@nestjs/swagger'
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator'


export class EventCreationInput {
    @IsString()
  name: string

  @IsString()
  organizer_id: string

  @IsNumber()
  @IsPositive()
  price: string

  @IsNumber()
  @IsPositive()
  seats: number

  @IsDate()
  date: Date

  @IsString()
    location: string
}

export class EventModificationInput extends OmitType(EventCreationInput, [
] as const) {
    @IsString()
    _id: string
}
