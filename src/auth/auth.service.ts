import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../domain/dto/auth.payload.dto';
import { JwtService } from '@nestjs/jwt';

const stubUsers = [
  {
    id: 1,
    username: 'peterparker',
    password: '123456',
  },
  {
    id: 2,
    username: 'spiderman',
    password: '123456',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Todo: Implement DB query here.
  validateUser(credentialPayload: AuthPayloadDto) {
    const { username, password } = credentialPayload;
    const foundCredential = stubUsers.find(
      (user) => user.username === username,
    );

    if (!foundCredential) return null;
    if (password === foundCredential.password) {
      const { password, ...authorizedCredentials } = foundCredential;
      return this.jwtService.sign(authorizedCredentials);
    }
  }
}
