import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthJwtDto } from '../../domain/dto/auth.jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwtstrategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SomeSuperRandomValue',
    });
  }

  validate(payload: AuthJwtDto) {
    return payload;
  }
}
