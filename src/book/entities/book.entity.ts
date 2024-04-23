import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true, autoIndex: false })
export class Book {
  @Prop({ unique: true })
  _id: string;
  @Prop({ unique: true, required: true })
  title: string;
  @Prop({ required: true })
  author: string;
  @Prop()
  ISBN: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
