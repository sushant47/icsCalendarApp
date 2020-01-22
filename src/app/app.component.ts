import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import icsToJson from 'ics-to-json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  events: any;
  constructor(private restService: RestService) {
  }
  ngOnInit() {
    this.restService.getCalendar()
      .subscribe(data => {
        this.displayData(data);
      }, (err: any) => {
        this.errorHandler(err);
      }
      );
  }
  /**
   * @description error handler method
   *
   * @private
   * @param {*} err
   * @memberof AppComponent
   */
  private errorHandler(err: any) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
  }
  /**
   * @description uses icsToJson library and transforms text to JSON.
   *
   * @param {*} dataValue
   * @returns
   * @memberof AppComponent
   */
  private displayData(dataValue: any) {
    this.events = icsToJson(dataValue);
    return this.events;
  }
}
