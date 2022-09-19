/** Auth 응답 값 */
export type AuthResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

/**
 * Google Login Uri
 * @returns url 값
 */
export const getLoginUri = (): string => {
  const loginUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  return `${loginUrl}${getLoginQueryParam(
    process.env.CLIENT_ID as string,
    'http://localhost:8080/callback'
  )}`;
};

/**
 * Google Login Query Parameter 반환
 * @param clientId Client 아이디
 * @param redirect redirect 값
 * @returns query parameter
 */
const getLoginQueryParam = (clientId: string, redirect: string): string => {
  return `?client_id=${clientId}&response_type=token&redirect_uri=${redirect}&scope=https://www.googleapis.com/auth/calendar`;
};
