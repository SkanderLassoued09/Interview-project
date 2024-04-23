import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDto {
  _id: string;
  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should  be string' })
  title: string;
  @IsNotEmpty({ message: 'author should not be empty' })
  @IsString({ message: 'author should  be string' })
  author: string;
  @IsOptional()
  @Length(13, 13, { message: 'ISBN should have exactly 13 characters' })
  ISBN?: string;
}
