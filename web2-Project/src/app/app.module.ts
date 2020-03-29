import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlightComponent } from './components/flight/flight.component';
import { CarComponent } from './components/car/car.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogInBtnComponent } from './components/log-in-btn/log-in-btn.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInBtnComponent } from './components/sign-in-btn/sign-in-btn.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlightComponent,
    CarComponent,
    LogInComponent,
    LogInBtnComponent,
    SignInComponent,
    SignInBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
