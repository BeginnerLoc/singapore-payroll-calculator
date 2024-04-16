import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EmailModule } from 'src/email/email.module';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, EmailModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
