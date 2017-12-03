import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  displayname: String;
  email: String;
  password: String;
  rePassword: String;
  userAvailable;
  emailAvailable;

  //to warm user if retyped pw doesn't match pw
  pwLenWarning:boolean;
  rePwWarning:boolean;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Check if username is available
  checkUsername() {
    this.validateService.checkUsername(this.username).subscribe(data => {
      this.userAvailable = data.success;
    });
  }

  // Check if email is available
  checkEmail(){
    this.validateService.checkEmail(this.email.toLowerCase()).subscribe(data => {
      this.emailAvailable = data.success;
    });
  }

  //warn the user the password is too short
  setPwWarning(){
    if(this.password.length < 6){
      this.pwLenWarning = true;
    }
    else{
      this.pwLenWarning = false;
    }
  }

  //check if pws match
  checkPass(){
    if(this.password==this.rePassword){
      this.rePwWarning = false;
      return true;
    }
    this.rePwWarning = true;
    return false;
  }
  //show or hide new password and retyped apssword match warning
  // setRePwWarning(){
  //   if(this.password == this._formRePswd){
  //     this.rePwWarning = false;
  //   }
  //   else{
  //     this.rePwWarning = true;
  //   }
  // }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email.toLowerCase(),
      username: this.username,
      displayname: this.username,
      password: this.password
    }
 
    if(this.password.length < 6){
      return false;              
    }
  
    //exit out of function if passwords don't match
    if(user.password!=this.rePassword){
      return false;
    }
    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid @ucsc.edu email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Check if email is available
    if(!this.emailAvailable) {
      this.flashMessage.show('Email already in use. Please try logging in', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Check if username is available
    if(!this.userAvailable) {
      this.flashMessage.show('Username is already taken', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }
}
