import Cookies from 'js-cookie';

const TOKEN_KEY = 'ker_active_auth_token';

export const session = {
  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 1, // Expires in 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  removeToken: (): void => {
    Cookies.remove(TOKEN_KEY);
  },
};
