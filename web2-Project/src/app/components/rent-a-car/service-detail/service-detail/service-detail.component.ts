import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private carServiceService: CarServiceService,
              public router: Router) { 
    route.params.subscribe(params => { this.id = params['id']; });
    this.myService = carServiceService.getServiceOverId(this.id);
  }

  ngOnInit(): void {
  }

  editService(){
    var str = "/rent-a-car-profile/create-or-replace-service";
    this.router.navigateByUrl(str);
  }
}
