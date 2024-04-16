import { Controller, Get, Post, UseGuards, Request, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
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
