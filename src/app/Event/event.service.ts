import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map} from "rxjs/operators";
import { Event, EventColl } from './event';

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

  // getevents(): Observable<Event[]> {
   
  //   var headerAPI = {
  //     headers: new HttpHeaders()
  //       .set('Authorization',  this.BearerToken)
  //   }
  
  // return this.http.get<EventColl>(API_URL + '/events',headerAPI)
  // .subscribe(data => 
  //   {
  //     this.events = data.items;
  //   });
  
  getevents(): Observable<Event[]> {
   
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  this.BearerToken)
    }
    return this.http.get<EventColl>(API_URL + '/events',headerAPI).pipe(
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

  

  // function() {
   
  //   var headerAPI = {
  //     headers: new HttpHeaders()
  //       .set('Authorization',  this.BearerToken)
  //   }
   
  //   var _getAllEvents = function () {
  //     return this.http.get(API_URL,headerAPI)
  //       .then(function (response) {
  //           return response.data
  //       });
  //     }
  //      return {
  //       getevents: _getAllEvents
  //       };
  //   }

     
  


  

  addevent(entity: Event) {
    var headerAPI = {
      headers: new HttpHeaders()
        .set('Authorization',  this.BearerToken)
    }
    console.log(event);
    return this.http.post(API_URL + '/events',entity) ;

    
  }
  

  updateevent(entity: Event): Observable<any> {
    return this.http.put(API_URL, entity, httpOptions);
  }

  deleteevent(id: number): Observable<Event> {
    return this.http.delete<Event>(API_URL + id.toString(), httpOptions);
  }
}
