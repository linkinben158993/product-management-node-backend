import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../domain/users/users.module';

// Todo: secret can be injected via runtime using (Cloud: SSM for AWS or others depend on CloudProvider or HCV)
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SomeSuperRandomValue',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
