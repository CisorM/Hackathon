import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../Authentication/login/cookies';

interface DecodedToken {
  id: number;
  userType: 'admin' | 'donor';
  name: string;
}

export const getUserInfoFromToken = (): {
  id: number;
  userType: 'admin' | 'donor';
  name: string;
} => {
  const accessToken = getCookie('access_token');

  if (accessToken) {
    const decodedToken: DecodedToken = jwtDecode(accessToken);
    return {
      id: decodedToken.id,
      userType: decodedToken.userType,
      name: decodedToken.name,
    };
  } else {
    return { id: 0, userType: 'donor', name: 'Usuario' };
  }
};
