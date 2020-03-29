import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './components/flight/flight.component';
import { CarComponent } from './components/car/car.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


const routes: Routes = [
  {
    path: "flight",
    component: FlightComponent
  },
  {
    path: "car",
    component: CarComponent
  },
  {
    path: "log-in",
    component: LogInComponent
  },
  {
    path: "sign-in",
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
