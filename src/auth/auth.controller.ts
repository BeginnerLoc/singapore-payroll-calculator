import { Controller, Get, Post, UseGuards, Request, Body, Param, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Request() req): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      access_token: this.authService.login(req.user)
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(): string {
    return;
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() createUserDto: CreateUserDto) {
    const user = this.authService.register(createUserDto);
    if (!user) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST)
    }
    this.authService.sendConfirmationEmail(createUserDto);
    return user;
  }

  @Get('confirmEmail/:uuid')
  @HttpCode(200)
  confirmEmail(@Param('uuid') uuid: string): any {
    const confirmationSuccess = this.authService.confirmEmail(uuid);
    if (!confirmationSuccess) {
      throw new HttpException('Invalid or expired confirmation link.', HttpStatus.BAD_REQUEST);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Email successfully confirmed.'
    };
  }
}
