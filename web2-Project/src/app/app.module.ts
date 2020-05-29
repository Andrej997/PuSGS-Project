import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
//import { GoogleMapsModule } from '@angular/google-maps'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CitiesComponent } from './components/rent-a-car/cities/cities.component';
import { FilteredCitiesComponent } from './components/rent-a-car/filtered-cities/filtered-cities.component';
import { SearchByCityComponent } from './components/rent-a-car/search-by-city/search-by-city.component';
import { SuggestionCitiesComponent } from './components/rent-a-car/suggestion-cities/suggestion-cities.component';
import { FlightsComponent } from './components/flights-components/flights/flights.component';
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
import { AvioCompanyDetailsComponent } from './components/flights-components/avio-company-details/avio-company-details.component';
import { SearchFlightComponent } from './components/flights-components/search-flight/search-flight.component';
import { FilterFlightComponent } from './components/flights-components/filter-flight/filter-flight.component';
import { RentACarProfileComponent } from './components/profile/rent-a-car-profile/rent-a-car-profile.component';
import { ServiceDetailComponent } from './components/rent-a-car/service-detail/service-detail/service-detail.component';
import { JustRentComponent } from './components/rent-a-car/just-rent/just-rent.component';
import { UserFriendsComponent } from './components/profile/user-friends/user-friends.component';
import { UserMessagesComponent } from './components/profile/user-messages/user-messages.component';
import { AirplaneSeatsComponent } from './components/flights-components/airplane-seats/airplane-seats.component';
import { FlightCallFriendsComponent } from './components/flights-components/flight-call-friends/flight-call-friends.component'
import { HeaderComponent } from './components/rent-a-car/header/header.component';
import { FilterSideBarComponent } from './components/rent-a-car/filter-side-bar/filter-side-bar.component';
import { FilteredCarsComponent } from './components/rent-a-car/filtered-cars/filtered-cars.component';
import { CcFlightComponent } from './components/flights-components/cc-flight/cc-flight.component';
import { FastFlightReservationComponent } from './components/flights-components/fast-flight-reservation/fast-flight-reservation.component';
import { CreateAvioCompanyComponent } from './components/flights-components/create-avio-company/create-avio-company.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CreatePlaneComponent } from './components/flights-components/create-plane/create-plane.component';
import { PlanesComponent } from './components/flights-components/planes/planes.component';
import { ChangeFlightComponent } from './components/flights-components/change-flight/change-flight.component';
import { MySpinnerComponent } from './components/flights-components/my-spinner/my-spinner.component';
import { PlaneSeatsComponent } from './components/flights-components/plane-seats/plane-seats.component'
import { RentDetailComponent } from './components/rent-a-car/rent-detail/rent-detail.component'
import { CreateFlightDestinationComponent } from './components/flights-components/create-flight-destination/create-flight-destination.component';
import { CreateOrReplaceServiceComponent } from './components/rent-a-car/create-or-replace-service/create-or-replace-service.component';
import { ChangeProfileComponent } from './components/profile/change-profile/change-profile.component'
import { AuthInterceptorService } from './services/authentication-service/auth-interceptor.service';
import { TokenInterceptorService } from './services/authentication-service/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlightsComponent,
    LogInComponent,
    SignInComponent,
    CarouselPhComponent,
    FooterComponent,
    ProfileComponent,
    FlightComponent,
    AvioCompaniesComponent,
    AvioCompanyDetailsComponent,

    CitiesComponent,
    FilteredCitiesComponent,
    SearchByCityComponent,
    SuggestionCitiesComponent,
    JustRentComponent,

    SearchFlightComponent,
    FilterFlightComponent,
    RentACarProfileComponent,
    ServiceDetailComponent,
    UserFriendsComponent,
    UserMessagesComponent,
    AirplaneSeatsComponent,
    FlightCallFriendsComponent,
    HeaderComponent,
    FilterSideBarComponent,
    FilteredCarsComponent,
    CcFlightComponent,
    FastFlightReservationComponent,
    CreateAvioCompanyComponent,
    StatisticsComponent,
    RentDetailComponent,
    CreateFlightDestinationComponent,
    CreatePlaneComponent,
    PlanesComponent,
    ChangeFlightComponent,
    MySpinnerComponent,
    PlaneSeatsComponent,
    CreateOrReplaceServiceComponent,
    ChangeProfileComponent,

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true,
        },
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
