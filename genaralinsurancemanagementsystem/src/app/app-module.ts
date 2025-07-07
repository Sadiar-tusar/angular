import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './component/home/home';
import { Dashboard } from './component/dashboard/dashboard';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Registration } from './component/auth/registration/registration';
import { Login } from './component/auth/login/login';
import { Logout } from './component/auth/logout/logout';
import { Userprofile } from './component/auth/userprofile/userprofile';
import { Showallhealthpolicy } from './component/health/showallhealthpolicy/showallhealthpolicy';
import { Addhealthpolicy } from './component/health/addhealthpolicy/addhealthpolicy';
import { Updatehealthpolicy } from './component/health/updatehealthpolicy/updatehealthpolicy';
import { RouterModule } from '@angular/router';
import { Healthbody } from './component/health/healthbody/healthbody';
import { Healthpolicyshow } from './component/health/healthpolicyshow/healthpolicyshow';

import { Policylist } from './component/policylist/policylist';
import { Policyform } from './component/policyform/policyform';



@NgModule({
  declarations: [
    App,
    Home,
    Dashboard,
    Registration,
    Login,
    Logout,
    Userprofile,
    Showallhealthpolicy,
    Addhealthpolicy,
    Updatehealthpolicy,
    Healthbody,
    Healthpolicyshow,
    Policyform,
    Policylist
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
