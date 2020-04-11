import { Component, OnInit, Output } from '@angular/core';
import { CarServiceService } from 'src/app/services/car-service/car-service.service';
import { FilterServiceService } from 'src/app/services/filter-service/filter-service.service';
import { AbstractFilterParam } from 'src/app/entities/abstract-filter-param/abstract-filter-param';
import { StringFilterParam } from 'src/app/entities/string-filter-param/string-filter-param';


@Component({
  selector: 'app-search-by-city',
  templateUrl: './search-by-city.component.html',
  styleUrls: ['./search-by-city.component.css']
})
export class SearchByCityComponent implements OnInit {

  constructor( private filterService: FilterServiceService) { }

  ngOnInit(): void { }

  newFilter(param: string){
    var filterParam: AbstractFilterParam;
    if (this.getFilterFieldValue("searchCity")) {
      filterParam = this.addCityNameFilterParam();
    }
    //this.filterService.changeFilter(param);
    //console.log(filterParam);
    this.filterService.changeFilter(filterParam);
  }

  clearFilterList(){
    this.newFilter("");
    //console.log("aaaaaaaaa");
  }

  addCityNameFilterParam(): ReturnType<any> {
    return new StringFilterParam("searchCity", this.getFilterFieldValue("searchCity"));
  }

  getFilterFieldValue(filterFieldId: string) {
    return (<HTMLInputElement> document.getElementById(filterFieldId)).value;
  }
}
