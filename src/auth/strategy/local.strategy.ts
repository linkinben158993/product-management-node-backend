import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  'mylocalstrategy',
) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.authService.validateUser({ username, password });
    if (!user) {
      return new UnauthorizedException('Invalid credential');
    }

    return user;
  }
}
