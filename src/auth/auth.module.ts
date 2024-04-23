import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '365d' },
      secret: 'hide-me',
      secretOrPrivateKey: 'hide-me',
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
