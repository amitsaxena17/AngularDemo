import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  map
  
} from "rxjs/operators";
import { Event } from './event';

const API_URL = "https://interview.cpdv.ninja/1a8dd55d-50ce-4220-92f7-a3e558520c75/api";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/text'
  })
};

@Injectable()
export class eventService {
  BearerToken : string ='';
  constructor(private http: HttpClient) { 
    this.BearerToken = 'Bearer ' +localStorage.getItem("bearerToken");
  }

  getevents(): Observable<Event[]> {
   
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  this.BearerToken)
    }
    return this.http.get(API_URL + '/events',headerAPI).pipe(
      map(res => {
        return res.items.map(item => {
          return new Event(
            item.id,
            item.title,
            item.description,
            item.startDate,
            item.endDate
          );
        });
      })
    );
     
  
}

  getevent(id: number): Observable<Event> {
    return this.http.get<Event>(API_URL + id.toString());
  }

  addevent(entity: Event): Observable<Event> {
    return this.http.post<Event>(API_URL, entity, httpOptions);
  }
  

  updateevent(entity: Event): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteevent(id: number): Observable<Event> {
    return this.http.delete<Event>(API_URL + id.toString(), httpOptions);
  }
}
