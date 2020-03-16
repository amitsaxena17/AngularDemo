import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {  map} from "rxjs/operators";
import { Event, EventColl } from './event';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
const API_URL = "https://interview.cpdv.ninja/1a8dd55d-50ce-4220-92f7-a3e558520c75/api";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/text'
  })
};

@Injectable()
export class eventService {
  BearerToken : string ='';
  events: Event[];
  constructor(private http: HttpClient) { 
    this.BearerToken = 'Bearer ' +localStorage.getItem("bearerToken");
  }
  ngOnInit() {
    this.getevents();
  }  
  getevents(): Observable<Event[]> {
   
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  this.BearerToken)
    }
    return this.http.get<EventColl>(API_URL + '/events',headerAPI)
    .map(result=>result.items)
      
}

  addevent(entity: Event) {
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  this.BearerToken)
    }
    return this.http.post(API_URL + '/events',entity,headerAPI).pipe(catchError(this.handleError)); ; 
  }
  
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return new ErrorObservable('There is a problem with the service. We are notified & working on it. Please try again later.');
    }
    
  deleteEvent()
  {
    alert("Only If you hire me!");
  }
}
