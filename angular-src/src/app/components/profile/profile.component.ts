import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //user:Object;
  username = 'placeholder';
  email = 'placeholder@email.com';
  bio = 'This bio is a placeholder.';
  currentUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {

    this.authService.getOneProfile(this.currentUser.id).subscribe(profileData => {
      if(profileData.success){
        //flash message for testing, remove later
        // this.flashMessage.show('Account Found!', {cssClass: 'alert-success', timeout: 3000});
        if(profileData.user.username){ this.username = profileData.user.username;} // Set username
        if(profileData.user.email){ this.email = profileData.user.email;} // Set e-mail
        if(profileData.user.bio){ this.bio = profileData.user.bio;} // Set bio
      } else{
        this.flashMessage.show('Profile data failed', {cssClass: 'alert-danger', timeout: 3000});
        // using Username field to test
        // this.username = profile.message;
      }

    })
  }

}
