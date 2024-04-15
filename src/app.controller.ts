import { Controller, Get, Post, UseGuards, Request, Body, Param } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(): string {
    return ;
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.register(createUserDto);
    if(user) {
      return this.authService.sendConfirmationEmail(createUserDto);
    }
  }

  @Get('confirmEmail/:uuid')
  confirmEmail(@Param('uuid') uuid: string) {
    return this.authService.confirmEmail(uuid);
  }
}
 