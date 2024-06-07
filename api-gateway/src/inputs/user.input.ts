import { OmitType } from '@nestjs/swagger'
import { IsDate, IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator'

const UserRoles = {
    USER: 'user',
    ORGANIZER: 'organizer'
}


export class UserSignupInput {
    @IsString()
    firstName: string

    @IsEmail()
    email?: string

    @IsPhoneNumber()
    phoneNumber: string

    @IsString()
    password?: string

    @IsString()
    username: string

    @IsDate()
    dateOfBirth: Date

    @IsEnum(UserRoles)
    role: string;
}

export class UserUpdateInput extends OmitType(UserSignupInput, [
  'password'
] as const) {}


export class LoginInput {
    @IsString()
    username: string
    
    @IsString()
    password: string
}

export class OrganizerSignupInput extends UserSignupInput {
  @IsString()
  organizationName: string
}