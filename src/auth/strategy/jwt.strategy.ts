import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwtstrategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SomeSuperRandomValue',
    });
  }

  validate(req: Request, res: Response, next: NextFunction) {
    console.log('Request:', req);
  }
}
