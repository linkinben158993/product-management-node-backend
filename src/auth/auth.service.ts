import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.payload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../domain/users/users.service';

const stubUsers = [
  {
    id: 1,
    username: 'peterparker',
    password: '123456',
    role: 'finance',
  },
  {
    id: 2,
    username: 'spiderman',
    password: '123456',
    role: 'procurement',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(credentialPayload: AuthPayloadDto) {
    const { username, password } = credentialPayload;
    const foundCredential = await this.userService.findByEmail(username);

    if (!foundCredential) return null;

    if (await bcrypt.compare(password, foundCredential.password_hash)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...authorizedCredentials } = foundCredential;
      return this.jwtService.sign(authorizedCredentials);
    }
  }
}
