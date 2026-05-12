import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor:
HttpInterceptorFn = (req, next) => {

  const token =
    localStorage.getItem('token');

  console.log('TOKEN SENT:', token);

  // Skip login API
  if (
    req.url.includes('/api/auth/login')
  ) {

    return next(req);

  }

  // Add token
  if (token) {

    req = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    });

  }

  return next(req);

};