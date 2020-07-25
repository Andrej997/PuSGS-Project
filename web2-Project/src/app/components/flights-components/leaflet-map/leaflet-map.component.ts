import { Component, OnInit } from '@angular/core';
import {icon, latLng, LayerGroup, Marker, marker, tileLayer} from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/entities/address/address';
import { HttpServiceService } from 'src/app/services/http-service/http-service.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  id: number;
  private place: Marker;
  private address: Address;

//skladisti marker(e)
  items: LayerGroup = new LayerGroup();

  constructor(private route: ActivatedRoute, private httpService: HttpServiceService) { }

//inicijalizacija
  options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 1,  //pocetni zoom
      center: latLng(0, 0) //centar mape
    };
  
 //mora se uraditi promise kod http da bi prvo preuzeo sve i tek onda krenuo da dobaljva lat i lng
  async ngOnInit() {
      this.route.params.subscribe(params => { this.id = params['id']; });

      // console.log()
      // @ts-ignore
      this.httpService.getIdAction("Map", this.id).toPromise()
      .then(result => {
        this.address = result as Address;
        console.log(this.address);
        let addressStr = this.address.streetAndNumber + ', ' + this.address.city + ', ' + this.address.country;
        // @ts-ignore
        const opencage = require('opencage-api-client');

        //key bi trebalo i dalje da radi (dobije se na njihovom sajtu - https://opencagedata.com/)
        opencage.geocode({q: addressStr, key: 'df145e8c933d49e399e5d6703a1e88b1'}).then(data => {
          if (data.status.code == 200) {
            if (data.results.length > 0) {
              
          var p = data.results[0];
              this.place = marker([p.geometry.lat, p.geometry.lng ], {
                icon: icon({
                  iconSize: [ 25, 41 ],
                  iconAnchor: [ 13, 41 ],
                  iconUrl: 'leaflet/marker-icon.png',
                  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
                  shadowUrl: 'leaflet/marker-shadow.png'
                })
              }).addTo(this.items);
            }
          } else if (data.status.code == 402) {
            console.log('hit free-trial daily limit');
          } else {
            // other possible response codes:
            // https://opencagedata.com/api#codes
            console.log('error', data.status.message);
          }
        }).catch(error => {
          console.log('error', error.message);
        });
      })
      .catch(
        err => {
          console.log(err)
        });
    }

  //preko layerGroup se sve automatski doda na mapu - markeri, lines..
  layerMainGroup: LayerGroup[] = [
    this.items
  ]
}
