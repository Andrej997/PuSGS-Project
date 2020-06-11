import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Address } from 'src/app/entities/address/address';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements AfterViewInit {

  // @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  // map: google.maps.Map;
  // lat = 45.25668629740302;
  // lng =  19.817602187084645;
  // coordinates = new google.maps.LatLng(this.lat, this.lng);
  // coordinates2= new google.maps.LatLng(this.lat, 20.00);
  // mapOptions: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   zoom: 6
  // };

  // marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map,
    
  //   title: 'Your address.',
  //   icon: {
  //     url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  //   }    ,
  //   draggable: true

  // });

  
  // mapInitializer() {
  //   this.map = new google.maps.Map(this.gmap.nativeElement, 
  //   this.mapOptions);
  //   this.marker.setMap(this.map);

  //   google.maps.LatLngBounds
  //  }

  constructor(private httpService: HttpServiceService) { }

  ngAfterViewInit(): void {
    // this.mapInitializer();
    
  }

}
