import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  name: String;
  // username: String;
  // email: String;
  password: String;
  bio: String;
  skills: Array<String>;

  user:Object;

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit() {
  }

  //go back on cancel button press
  goBack(){
    this.location.back();
  }

  //send a post request to save settings from form
  onSettingsSubmit(){
    const user = {
      name: this.name,
      // email: this.email.toLowerCase(),
      // username: this.username,
      password: this.password,
      bio: this.bio,
      skills: this.skills
    }
      this.flashMessage.show('onSettingsSubmit() function reached', {cssClass: 'alert-success', timeout: 3000});
      this.authService.editUser(user).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Settings Saved!', {cssClass: 'alert-success', timeout: 3000});
        }
        else{
          this.flashMessage.show('Error. Changes to settings not applied', {cssClass: 'alert-danger', timeout: 3000});
        }
      })
  }

}
