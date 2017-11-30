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

  //check if both passwords entered match for registration/settings pages
  validataPassword(pswd,retypedPswd){
    if (pswd === retypedPswd) {
      return true;
    }
    return false;
  }

  //check if string is url
  validateURL(address) {
    //url checking regExp from Devshed
    var URLPattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
      '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
      '(\#[-a-z\d_]*)?$','i'); // fragment locater
    if(!URLPattern.test(address)) {
      alert("Please enter a valid web address");
      return false;
    }
    return true;
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
