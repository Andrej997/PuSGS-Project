import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { FlightsComponent } from './components/flights/flights.component';
// import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';

import { FlightsComponent } from './components/flights-components/flights/flights.component';
//import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';

import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CarouselPhComponent } from './components/home/carousel-ph.component';
import { UserGuard } from './guards/user-guard/user.guard';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { AvioCompaniesComponent } from './components/flights-components/avio-companies/avio-companies.component';
import { AvioCompanyDetailsComponent } from './components/flights-components/avio-company-details/avio-company-details.component';

import { CitiesComponent } from './components/rent-a-car/cities/cities.component'
import { UserFriendsComponent } from './components/profile/user-friends/user-friends.component';
import { UserMessagesComponent } from './components/profile/user-messages/user-messages.component';


const routes: Routes = [
  
  {
    path: "flights",
    component: FlightsComponent
  },
  {
    path: "rent-a-car",
    component: CitiesComponent,
    // canActivate: [UserGuard]
  },
  // {
  //   path: "rent-a-car",
  //   component: RentACarComponent,
  //   canActivate: [UserGuard]
  // },
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
    path: "profile", component: ProfileComponent
  },
  {
    path : "friends", component: UserFriendsComponent
  },
  {
    path : "messages", component: UserMessagesComponent
  },
  {
    path: "avio-companies",
    children:[
      { path: "", component: AvioCompaniesComponent },
      { path: ":id/details", component: AvioCompanyDetailsComponent }
    ]
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
