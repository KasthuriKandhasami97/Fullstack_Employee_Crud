// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { provideToastr } from 'ngx-toastr';

// bootstrapApplication(App,{
//   providers: [
//     provideRouter(routes),
//     provideHttpClient(withInterceptorsFromDi()), // ✅ important
//     provideToastr()   
//   ]
// }).catch(err => console.error(err));
import { bootstrapApplication }
from '@angular/platform-browser';
import { routes } from './app/app.routes';

import { appConfig }
from './app/app.config';

import { App }
from './app/app';

bootstrapApplication(
  App,
  appConfig
).catch(err => console.error(err));