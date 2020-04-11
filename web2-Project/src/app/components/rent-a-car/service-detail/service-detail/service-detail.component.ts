import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentACarService } from 'src/app/entities/rent-a-car-service/rent-a-car-service';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  id: number;
  myService: RentACarService;
  prosek: number;


  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService) { 
    route.params.subscribe(params => { this.id = params['id']; });
    this.myService = carServiceService.getService(this.id);
    this.calculateAvg();
  }

  calculateAvg(){
    var zbir: number;
    zbir = 0;
    this.myService.raiting.forEach(element => {
      zbir += element;
    });
    this.prosek =  zbir / this.myService.raiting.length;
  }

  ngOnInit(): void {
  }

}
