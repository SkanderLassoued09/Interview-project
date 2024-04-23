import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  _id: string;
  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should  be string' })
  title: string;
  @IsNotEmpty({ message: 'author should not be empty' })
  @IsString({ message: 'author should  be string' })
  author: string;

  ISBN?: string;
}
