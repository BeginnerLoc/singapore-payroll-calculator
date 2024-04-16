import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FormulaModule } from './formula/formula.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FormulaModule, UsersModule, AuthModule, EmailModule,
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true})],
  controllers: [AppController],
})
export class AppModule { }
