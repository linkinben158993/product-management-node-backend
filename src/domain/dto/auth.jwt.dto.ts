export class AuthJwtDto {
  id?: number;
  username?: string;
  iat?: bigint;
  exp?: bigint;
}