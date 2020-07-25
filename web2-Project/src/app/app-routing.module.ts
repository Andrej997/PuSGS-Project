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
import { RentDetailComponent } from './components/rent-a-car/rent-detail/rent-detail.component';
import { CreateFlightDestinationComponent } from './components/flights-components/create-flight-destination/create-flight-destination.component';
import { CreatePlaneComponent } from './components/flights-components/create-plane/create-plane.component';
import { PlanesComponent } from './components/flights-components/planes/planes.component';
import { ChangeFlightComponent } from './components/flights-components/change-flight/change-flight.component';
import { CreateOrReplaceServiceComponent } from './components/rent-a-car/create-or-replace-service/create-or-replace-service.component';
import { ChangeProfileComponent } from './components/profile/change-profile/change-profile.component';
import { FlightReservationComponent } from './components/flights-components/flight-reservation/flight-reservation.component';
import { AcceptReservationComponent } from './components/flights-components/accept-reservation/accept-reservation.component';
import { MyMapComponent } from './components/flights-components/my-map/my-map.component';
import { LeafletMapComponent } from './components/flights-components/leaflet-map/leaflet-map.component';


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
        children: [
          { path: "",
            component: JustRentComponent},
          { path: ":serviceId/:branchId/:carId/rent-detail",
            component: RentDetailComponent
          }
        ]
        
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
      },
      {
        path: "create-or-replace-service",
        component: CreateOrReplaceServiceComponent
      }
    ]
  },
  {
    path: "map",
    component: LeafletMapComponent
  },
  {
    path: "log-in",
    component: LogInComponent
  },
  {
    path: "map",
    component: MyMapComponent
  },
  {
    path: "invitation",
    component: AcceptReservationComponent
  },
  {
    path: "sign-in",
    children: [
      { path: "", component: SignInComponent },
      { path: ":id", component: SignInComponent }
    ]
  },
  {
    path: "change-profile",
    children: [
      { path: "", component: ChangeProfileComponent },
      { path: ":id", component: ChangeProfileComponent }
    ]
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
    children: [
      { path: "", component: AvioCompaniesComponent },
      { path: ":id/details", component: AvioCompanyDetailsComponent }
    ]
  },
  {
    path: "reservations",
    children: [
      { path: "", component: FlightReservationComponent},
      { path: ":id", component: FlightReservationComponent}
    ]
  },
  { 
    path: "createFlight", 
    children: [
      { 
        path: ":idC", 
        children: [
          { path: "", component: CcFlightComponent }, //* ako dodajemo
          { path: ":idF", component: CcFlightComponent } //! ako menjamo
        ] 
      }
    ]
  },
  {
    path: "changeFlight",
    children: [
      { path: ":id", component: ChangeFlightComponent}
    ]
  },
  {
    path: "createAvioCompany",
    children: [
      { path: "", component: CreateAvioCompanyComponent }, //* ako se kreira nova
      { path: ":id", component: CreateAvioCompanyComponent } //* ako se menja
    ]
  },
  {
    path: "createFlightDestinaion",
    children: [
      { 
        path: ":idC", 
        children: [
          { path: "", component: CreateFlightDestinationComponent }, //* ako dodajemo
          { path: ":idFD", component: CreateFlightDestinationComponent } //! ako menjamo
        ] 
      }
    ]
  },
  {
    path: "statistics",
    component: StatisticsComponent
  },
  {
    path: "createPlane",
    children: [
      { path: "", component: CreatePlaneComponent },
      { path: ":id", component: CreatePlaneComponent}
    ]
  },
  {
    path: "planes",
    component: PlanesComponent
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
