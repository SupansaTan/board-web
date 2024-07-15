export class ITokenResponse {
  accessToken: string;
  username: string;

  constructor(
    accessToken: string,
    username: string,
  ) {
    this.accessToken = accessToken;
    this.username = username;
  }
}