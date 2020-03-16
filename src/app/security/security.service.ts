import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import 'rxjs/add/operator/map';

import { Response } from '@angular/http'


const API_URL = "https://interview.cpdv.ninja/1a8dd55d-50ce-4220-92f7-a3e558520c75/api/auth";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  public token: string;
  constructor(private http: HttpClient) {

  }

  login(clientId): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();
 
    clientId = "1a8dd55d-50ce-4220-92f7-a3e558520c75";
   var  clientSecret = "ttHIvXc7bzaq56G5FL4jHiwh3/1CEcJD3kBa7Ak5HvY=";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(API_URL, {clientId, clientSecret}, {
     
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }).map((response: Response) => {
          // login successful if there's a jwt token in the response
          localStorage.setItem("bearerToken",
          response['access_token']);
          this.securityObject.bearerToken = response['access_token'];
          this.securityObject.isAuthenticated=true;
       
          if (this.securityObject.bearerToken) {
              return this.securityObject;
          } else {
              // return false to indicate failed login
              this.securityObject.userName = "";
              this.securityObject.bearerToken = "";
              this.securityObject.isAuthenticated = false;
            
              return this.securityObject;
          }
        });

    
  }
  
  logout(): void {
    this.resetSecurityObject();
  }
  
  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
  
  
    //localStorage.removeItem("bearerToken");
  }
}