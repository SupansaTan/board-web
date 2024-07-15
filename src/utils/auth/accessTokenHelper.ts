import Cookies from 'js-cookie';

export function setAccessToken(
  accessToken: string,
): void {
  Cookies.set('accessToken', accessToken);
}

export function getAccessToken(): string {
  const accessToken = Cookies.get('accessToken');
  return accessToken ? `Bearer ${accessToken}` : '';
}

export function removeAccessToken(): void {
  Cookies.remove('accessToken');
}