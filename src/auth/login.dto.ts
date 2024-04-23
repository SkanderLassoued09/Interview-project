import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString({ message: 'Username should be a string' })
  @IsNotEmpty({ message: 'You should provide your username' })
  username: string;
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'You should provide your password' })
  password: string;
}
