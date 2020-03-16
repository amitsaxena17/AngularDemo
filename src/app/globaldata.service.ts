import { Injectable } from '@angular/core';

interface SharedBearerToken {
  [id: string]: any;
}

@Injectable()
export class GlobalDataService {
  shareObj: SharedBearerToken = {};
}