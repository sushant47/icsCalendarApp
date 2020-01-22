import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
/**
 * @description returns calendar ics file
 *
 * @returns
 * @memberof RestService
 */
getCalendar() {
    return this.http.get('assets/basic.ics', { responseType: 'text' as 'json'});
  }
}
