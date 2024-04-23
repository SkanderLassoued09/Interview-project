import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  _id: string;
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString({ message: 'Username should  be string' })
  username: string;
  @IsNotEmpty({ message: 'First name  should not be empty' })
  @IsString({ message: 'First name should be string' })
  firstName: string;
  @IsNotEmpty({ message: 'Last name should not be empty' })
  @IsString({ message: 'Last name  should  be string' })
  lastName: string;
  @MinLength(6, { message: 'Your password should has at least 6 caraters' })
  password: string;
}
