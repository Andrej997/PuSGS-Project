import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsComponent } from './components/flights/flights.component';
import { RentACarComponent } from './components/rent-a-car/rent-a-car.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CarouselPhComponent } from './components/home/carousel-ph.component';

const routes: Routes = [
  {
    path: "flights",
    component: FlightsComponent
  },
  {
    path: "rent-a-car",
    component: RentACarComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
