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

  constructor(private http: HttpClient) { 
    

  }

  getevents(): Observable<Event[]> {
    var BearerToken = 'Bearer ' +localStorage.getItem("bearerToken").toString();
    
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  BearerToken)
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

  getevent(id: number): Observable<event> {
    return this.http.get<event>(API_URL + id.toString());
  }

  addevent(entity: event): Observable<event> {
    return this.http.post<event>(API_URL, entity, httpOptions);
  }

  updateevent(entity: event): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteevent(id: number): Observable<event> {
    return this.http.delete<event>(API_URL + id.toString(), httpOptions);
  }
}
