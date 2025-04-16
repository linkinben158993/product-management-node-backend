import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MyLocalGuard } from './guard/my.local.guard';
import { Request } from 'express';
import { MyJwtGuard } from './guard/my.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(MyLocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(MyJwtGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
