import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event,  EventColl } from './event';
import { eventService } from './event.service';

@Component({
  templateUrl: './event-list.component.html'
})
export class eventListComponent implements OnInit {
  events: Event[];
  
  constructor(private eventService: eventService,
    private router: Router) { 
      
    }

  ngOnInit() {
  
    this.getevents();
  }

   getevents(): void {
    
     this.eventService.getevents()
        .subscribe(events => this.events = events);
    }
    deleteEvent()
    {
      this.eventService.deleteEvent();
    }

  addevent(): void {
    this.router.navigate(['/eventDetail', -1]);
  }

}
