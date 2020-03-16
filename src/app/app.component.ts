import { Component } from '@angular/core';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = "Civic Plus Trainings Events";
  securityObject: AppUserAuth = null;

  constructor(public securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
    
  }
  login(): void {
    event.preventDefault();
    alert('here');
    this.securityService.login();
  }
  logout(): void {
    this.securityService.logout();
  }
}
