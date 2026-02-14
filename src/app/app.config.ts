import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import {  provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes , withHashLocation() ),
     provideClientHydration() ,
     provideAnimations() ,
     provideHttpClient(withInterceptors([loadingInterceptor])) ,
     importProvidersFrom(BrowserAnimationsModule ) ,
    provideToastr({
      timeOut: 2500 ,
      closeButton : true ,
      progressBar : true ,
      progressAnimation : 'increasing' ,
      positionClass : 'toast-top-right' ,
      tapToDismiss : true
    })
    ]
};
