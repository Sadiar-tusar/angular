import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { ViewAllStudent } from './view-all-student/view-all-student';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Addstudent } from './addstudent/addstudent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Updatestudent } from './updatestudent/updatestudent';
import { ViewAllLocation } from './location/view-all-location/view-all-location';
import { Addlocation } from './location/addlocation/addlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';

@NgModule({
  declarations: [
    App,
    Home,
    ViewAllStudent,
    Addstudent,
    Updatestudent,
    ViewAllLocation,
    Addlocation,
    Updatelocation
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
