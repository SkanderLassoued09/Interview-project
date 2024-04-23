import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() userCredentials: LoginDTO) {
    return this.authService.login(
      userCredentials.username,
      userCredentials.password,
    );
  }
}
