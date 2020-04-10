import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlightsComponent } from './components/flights-components/flights/flights.component';
import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CarouselPhComponent } from './components/home/carousel-ph.component';
import { FooterComponent } from './components/footer/footer.component';

import { fakeBackendProvider } from './interceptors/fake-backend/fake-backend.interceptor'
import { BasicAuthInterceptor } from './interceptors/basic-auth-interceptor/basic-auth.interceptor'
import { ErrorInterceptor } from './interceptors/error-interceptor/error.interceptor';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { FlightComponent } from './components/profile/flight/flight.component';
import { AvioCompaniesComponent } from './components/flights-components/avio-companies/avio-companies.component';
import { AvioCompanyDetailsComponent } from './components/flights-components/avio-company-details/avio-company-details.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlightsComponent,
    RentACarComponent,
    LogInComponent,
    SignInComponent,
    CarouselPhComponent,
    FooterComponent,
    ProfileComponent,
    FlightComponent,
    AvioCompaniesComponent,
    AvioCompanyDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //GoogleMapsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
