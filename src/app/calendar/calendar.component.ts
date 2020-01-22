import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() posts: any;
  private events = [];
  constructor() { }

  ngOnInit() {
    this.setCalendarEventObj();
  }
  /**
   * @description transforms calendar events
   *
   * @memberof CalendarComponent
   */
  setCalendarEventObj() {
    for (const post of this.posts) {
      this.setData(post);
    }
    this.initializeCalendar();
  }
  /**
   * @description transforms ics read file data into fullcalendar api properties
   *
   * @private
   * @param {*} post
   * @memberof CalendarComponent
   */
  private setData(post: any) {
    const localEvent = {};
    localEvent[`title`] = post.summary;
    localEvent[`description`] = post.description;
    localEvent[`start`] = moment(post.startDate).format('YYYY-MM-DD');
    this.events.push(localEvent);
  }
  /**
   * @description initializes calendar events
   *
   * @memberof CalendarComponent
   */
  initializeCalendar() {
    setTimeout(() => {
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        navLinks: true,
        editable: true,
        eventLimit: true,
        events: this.events,  // request to load current events
      });
    }, 100);
  }
}
