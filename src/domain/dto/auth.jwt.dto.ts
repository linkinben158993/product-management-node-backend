export class AuthJwtDto {
  id?: number;
  username?: string;
  role?: string;
  iat?: bigint;
  exp?: bigint;
}
