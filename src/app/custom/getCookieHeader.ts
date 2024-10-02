import { getCookie } from '../Authentication/login/cookies';

export const getCookieHeader = () => {
  const token = getCookie('access_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    headerPost: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    headerPostForm: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    token,
  };
};
