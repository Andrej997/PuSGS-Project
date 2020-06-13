import { Component, OnInit, Input } from '@angular/core';
import { ShareDataServiceService } from 'src/app/services/share-data-service/share-data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() city;
  message:string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;

  constructor(private data: ShareDataServiceService) { 
  //   var startDay = (document.getElementById("startDay")) as HTMLInputElement;
  //   var endDay = (document.getElementById("endDay")) as HTMLInputElement;
  //   var startTime = (document.getElementById("startTime")) as HTMLInputElement;
  //   var endTime = (document.getElementById("endTime")) as HTMLInputElement;

  // console.log(startDay);

  //   this.data.changeStartDay(startDay.value);
  //   this.data.changeEndDay(endDay.value);
  //   this.data.changeStartTime(startTime.value);
  //   this.data.changeEndTime(endTime.value);
  }

  ngOnInit(): void {
  //((document.getElementById("startDay")) as HTMLInputElement).value = Date.now();

    //this.data.currentMessage.subscribe(message => this.message = message);
    // this.data.startD.subscribe(startDay => this.startDay = startDay);
    // this.data.startD.subscribe(endDay => this.endDay = endDay);
    // this.data.startD.subscribe(startTime => this.startTime = startTime);
    // this.data.startD.subscribe(endTime => this.endTime = endTime);

    var startDay = (document.getElementById("startDay")) as HTMLInputElement;
    var endDay = (document.getElementById("endDay")) as HTMLInputElement;
    var startTime = (document.getElementById("startTime")) as HTMLInputElement;
    var endTime = (document.getElementById("endTime")) as HTMLInputElement;

    this.data.changeStartDay(startDay.value);
    this.data.changeEndDay(endDay.value);
    this.data.changeStartTime(startTime.value);
    this.data.changeEndTime(endTime.value);

  }

  newMessage() {
    this.data.changeMessage("Hello ")

    

    var startDay = (document.getElementById("startDay")) as HTMLInputElement;
    var endDay = (document.getElementById("endDay")) as HTMLInputElement;
    var startTime = (document.getElementById("startTime")) as HTMLInputElement;
    var endTime = (document.getElementById("endTime")) as HTMLInputElement;

    this.data.changeStartDay(startDay.value);
    this.data.changeEndDay(endDay.value);
    this.data.changeStartTime(startTime.value);
    this.data.changeEndTime(endTime.value);

    console.log(startDay.value);
    console.log(endDay.value);
    console.log(startTime.value);
    console.log(endTime.value);
  }

}
