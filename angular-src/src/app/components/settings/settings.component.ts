import { Component, OnInit } from '@angular/core';
//import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ValidateService} from '../../services/validate.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  name = "First Last";
  password = "password";
  username = this.user.username;
  //retypedPswd: String;  
  bio = "Who even, like, are you?";
  //skills: Array<String>;
  imgLink = "https://i.imgur.com/6eOlEUB.jpg";
  changes = false;
  //prevPage = this.location.back();

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit() {
    this.getSettings();
  }

  //go back to previous page on cancel button press
  goBack(tf){
    if(tf){
      this.location.back();
    }
  }

  //for showing the "save settings" button when user types in fields
  noticeChanges(){
    this.changes = true;
  }

  //load existing settings into vars to act as placeholders
  getSettings() {
    this.authService.getOneProfile(this.user.id).subscribe(profile => {
      if(profile.success){
        if(profile.user.name){this.name = profile.user.name;} // Set components name var
        this.username = profile.user.username;
        if(profile.user.bio){this.bio = profile.user.bio;} // Set ... bio
        if(profile.user.imgLink){this.imgLink = profile.user.imgLink;} // Set ... imgLink
      } else{
        this.flashMessage.show('Settings data error', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  //send a put request to save settings from form
  onSettingsSubmit(){
    const user = {
      name: this.name,
      //password: this.password,
      bio: this.bio,
      //skills: this.skills,
      imgLink: this.imgLink
    }
    // if(!this.validateService.validateURL(user.imgLink)){
    //   this.flashMessage.show('Please enter a valid web address of an image', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }
    this.flashMessage.show('onSettingsSubmit() function reached', {cssClass: 'alert-success', timeout: 3000});
    this.authService.updateSettings(user).subscribe(data => {
      if (data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      }
      else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 100000});
      }
    })
  }

}
