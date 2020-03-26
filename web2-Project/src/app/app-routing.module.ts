import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightComponent } from './components/flight/flight.component';
import { CarComponent } from './components/car/car.component';


const routes: Routes = [
  {
    path: "flight",
    component: FlightComponent
  },
  {
    path: "car",
    component: CarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
