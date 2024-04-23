import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    let user = await this.userService.findUserByUsername(username);

    if (!user) {
      throw new HttpException(`Invalid username`, HttpStatus.UNAUTHORIZED);
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    if (user) {
      const matchpassword = await bcrypt.compare(password, user.password);
      if (matchpassword) {
        const payload = { _id: user._id, username: user.username };
        return {
          access_token: this.jwtService.sign(payload, { secret: 'hide-me' }),
        };
      }
    }
  }
}
