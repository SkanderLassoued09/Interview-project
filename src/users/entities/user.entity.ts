import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id: string;
  @Prop()
  username: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  }
});
