import { ApplicationConfig }
from '@angular/core';

import { provideRouter }
from '@angular/router';

import { routes }
from './app.routes';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideAnimationsAsync }
from '@angular/platform-browser/animations/async';

import { provideToastr }
from 'ngx-toastr';

import { authInterceptor }
from './auth-interceptor';

export const appConfig:
ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideAnimationsAsync(),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),

    provideToastr({
      timeOut: 2000,
      progressBar: true,
      closeButton: true
    })

  ]

};