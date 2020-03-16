import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';
import { LOGIN_MOCKS } from './login-mocks';
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

  login(): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();
 
    var clientId = "1a8dd55d-50ce-4220-92f7-a3e558520c75";
    var clientSecret = "ttHIvXc7bzaq56G5FL4jHiwh3/1CEcJD3kBa7Ak5HvY=";
//Move them to settings file

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(API_URL, {clientId, clientSecret}, {
     
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }).map((response: Response) => {
          // login successful if there's a jwt token in the response
          this.securityObject.bearerToken = response['access_token'];
          this.securityObject.isAuthenticated=true;
          this.securityObject.canAccessProducts=true;
          this.securityObject.canAddCategory = true;
          localStorage.setItem("bearerToken",this.securityObject.bearerToken);
          if (this.securityObject.bearerToken) {
              return this.securityObject;
          } else {
              // return false to indicate failed login
              this.securityObject.userName = "";
              this.securityObject.bearerToken = "";
              this.securityObject.isAuthenticated = false;
            
              this.securityObject.canAccessProducts = false;
              this.securityObject.canAddProduct = false;
              this.securityObject.canSaveProduct = false;
              this.securityObject.canAccessCategories = false;
              this.securityObject.canAddCategory = false;
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
  
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories = false;
    this.securityObject.canAddCategory = false;
  
    //localStorage.removeItem("bearerToken");
  }
}