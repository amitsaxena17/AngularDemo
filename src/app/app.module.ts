import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { eventListComponent } from './Event/event-list.component';
import { eventDetailComponent } from './Event/event-detail.component';
import { eventService } from './Event/event.service';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecurityService } from './security/security.service';
import { LoginComponent } from './security/login.component';
import { HttpInterceptorModule } from './security/http-interceptor';
import { GlobalDataService } from './globaldata.service';

@NgModule({
  declarations: [
    AppComponent,
    eventListComponent,
    eventDetailComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpInterceptorModule
  ],
  providers: [eventService, SecurityService,GlobalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
