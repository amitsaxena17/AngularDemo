import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import { eventService } from "./event.service";
import { Event } from './event';


@Component({
  templateUrl: './event-detail.component.html'
})
export class eventDetailComponent implements OnInit {
  eventItem: Event;
  originalevent: Event;
  

  constructor(
    private eventService: eventService,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit() {
  
    // Get the passed in event id
    let id = +this.route.snapshot.paramMap.get('id');
    // Create or load a event
    this.createOrLoadevent(id);
  }

  private createOrLoadevent(id: number) {
    if (id == -1) {
      // Create new event object
      this.initevent();
    }
    else {
      // Get a event from event service
      // this.eventService.getevent(id)
      //   .subscribe(event => {
      //     this.event = event;
      //     this.originalevent = Object.assign({}, this.event)
      //   });
    }
  }

  private initevent(): void {
    // Add a new event
    this.eventItem = new Event({
      startDate: new Date(),
      id: -1,
      endDate: new Date,
      title:'',
      description:''
    });
    this.originalevent = Object.assign({}, this.eventItem);
  }

  // private getCategories(): void {
  //   this.categoryService.getCategories()
  //     .subscribe(categories => this.categories = categories);
  // }

  saveData(): void {
    if (this.eventItem.id) {
      // Update event
      // this.eventService.updateevent(this.event)
      //   .subscribe(event => { this.event = event },
      //     () => null,
      //     () => this.dataSaved());
    }
    else {
      // Add a event
      this.eventService.addevent(this.eventItem)
        .subscribe(event => { this.eventItem = event },
          () => null,
          () => this.dataSaved());
    }
  }

  private dataSaved(): void {
    // Redirect back to list
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.goBack();
  }
}
