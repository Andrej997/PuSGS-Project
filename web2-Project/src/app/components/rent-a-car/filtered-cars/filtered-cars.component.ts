import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filtered-cars',
  templateUrl: './filtered-cars.component.html',
  styleUrls: ['./filtered-cars.component.css']
})
export class FilteredCarsComponent implements OnInit {

  @Input() services;
  @Input() cars;
  
  constructor() { 
    
    //this.services = carServiceService.getServicesInCity(this.city);
  }

  ngOnInit(): void {
  }

}
