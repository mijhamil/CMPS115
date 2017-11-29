import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ValidateService {

  constructor(private http:Http) { }

  checkUsername(username) {
    return this.http.get('http://localhost:3000/users/checkUsername/' + username).map(res => res.json());
  }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined ||user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var univExt = "@ucsc.edu";
    if(email.indexOf(univExt)==-1){
      return false;
    }
    else{
      return re.test(email);
    }
  }
}
