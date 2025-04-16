import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from '../domain/dto/AuthPayloadDto';
import { AuthService } from './auth.service';
import { MyLocalGuard } from './guard/my.local.guard';
import { Request } from 'express';
import { MyJwtGuard } from './guard/my.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(MyLocalGuard)
  login(@Body() credentialPayload: AuthPayloadDto) {
    if (!credentialPayload) {
      return new HttpException(
        'Username and Password Is Required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.authService.validateUser(credentialPayload);

    return this.authService.validateUser(credentialPayload);
  }

  @Get('status')
  @UseGuards(MyJwtGuard)
  status(@Req() req: Request) {

  }
}
