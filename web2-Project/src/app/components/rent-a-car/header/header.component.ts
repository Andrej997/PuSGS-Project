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

  constructor(private data: ShareDataServiceService) { }

  ngOnInit(): void {
  //((document.getElementById("startDay")) as HTMLInputElement).value = Date.now();

    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newMessage() {
    this.data.changeMessage("Hello ")


    var startDay = (document.getElementById("startDay")) as HTMLInputElement;
    var endDay = (document.getElementById("endDay")) as HTMLInputElement;
    var startTime = (document.getElementById("startTime")) as HTMLInputElement;
    var endTime = (document.getElementById("endTime")) as HTMLInputElement;

    console.log(startDay.value);
    console.log(endDay.value);
    console.log(startTime.value);
    console.log(endTime.value);
  }

}
