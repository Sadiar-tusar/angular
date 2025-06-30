import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './component/home/home';
import { Dashboard } from './component/dashboard/dashboard';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { Registration } from './registration/registration';
import { Userprofile } from './userprofile/userprofile';

@NgModule({
  declarations: [
    App,
    Home,
    Dashboard,
    Login,
    Logout,
    Registration,
    Userprofile
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
