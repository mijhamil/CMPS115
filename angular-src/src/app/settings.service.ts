import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class SettingsService {

  constructor(private http:Http) { }

  changeUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/' + 'settings/', user, {headers: headers})
      .map(res => res.json());
  }
}
