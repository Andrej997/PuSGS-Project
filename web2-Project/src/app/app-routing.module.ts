import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './components/flights-components/flights/flights.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CarouselPhComponent } from './components/home/carousel-ph.component';
import { UserGuard } from './guards/user-guard/user.guard';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { AvioCompaniesComponent } from './components/flights-components/avio-companies/avio-companies.component';
import { AvioCompanyDetailsComponent } from './components/flights-components/avio-company-details/avio-company-details.component';
import { CitiesComponent } from './components/rent-a-car/cities/cities.component'
import { RentACarProfileComponent } from './components/profile/rent-a-car-profile/rent-a-car-profile.component';
import { ServiceDetailComponent } from './components/rent-a-car/service-detail/service-detail/service-detail.component';
import { JustRentComponent } from './components/rent-a-car/just-rent/just-rent.component';
import { UserFriendsComponent } from './components/profile/user-friends/user-friends.component';
import { UserMessagesComponent } from './components/profile/user-messages/user-messages.component';
import { FlightComponent } from './components/profile/flight/flight.component';
import { CcFlightComponent } from './components/flights-components/cc-flight/cc-flight.component';
import { FastFlightReservationComponent } from './components/flights-components/fast-flight-reservation/fast-flight-reservation.component';
import { CreateAvioCompanyComponent } from './components/flights-components/create-avio-company/create-avio-company.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


const routes: Routes = [
  
  {
    path: "flights",
    children:[
      { path: "", component: FlightsComponent },
      { path: ":id/flightdetails", component: FlightComponent },
      { path: ":id/fastReservaion", component: FastFlightReservationComponent }
    ]
  },
  {
    path: "rent-a-car",
    children:[
      { path: "",
        component: CitiesComponent},
      { path: ":cityId/just-rent",
        component: JustRentComponent
      }
    ]
    // canActivate: [UserGuard]
  },
  {
    path: "rent-a-car-profile",
    children:[
      { path: "",
        component: RentACarProfileComponent},
      { path: ":id/service-detail",
        component: ServiceDetailComponent
      }
    ]
  },
  {
    path: "log-in",
    component: LogInComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  },
  {
    path: "home",
    component: CarouselPhComponent
  },
  {
    path: "profile", 
    component: ProfileComponent
  },
  {
    path : "friends", 
    component: UserFriendsComponent
  },
  {
    path : "messages", 
    component: UserMessagesComponent
  },
  {
    path: "avio-companies",
    children:[
      { path: "", component: AvioCompaniesComponent },
      { path: ":id/details", component: AvioCompanyDetailsComponent }
    ]
  },
  { 
    path : "createFlight", 
    component: CcFlightComponent 
  },
  {
    path: "createAvioCompany",
    component: CreateAvioCompanyComponent
  },
  {
    path: "statistics",
    component: StatisticsComponent
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
