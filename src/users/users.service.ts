import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private async generateDiId(): Promise<number> {
    let userIndex = 0;
    const lastUser = await this.userModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );

    if (lastUser) {
      userIndex = +lastUser._id.substring(4);

      return userIndex + 1;
    }

    return userIndex;
  }

  async create(createUserDto: CreateUserDto) {
    const bookIndexCreation = await this.generateDiId();
    createUserDto._id = `USER${bookIndexCreation}`;
    return await new this.userModel(createUserDto).save();
  }

  async findUserByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
