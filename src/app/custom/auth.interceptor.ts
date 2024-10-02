import { HttpInterceptorFn } from '@angular/common/http';
import { getCookie } from '../Authentication/login/cookies';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.indexOf('login') > 0) return next(req);
  const token = getCookie('access_token');
  const clonRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clonRequest);
};
