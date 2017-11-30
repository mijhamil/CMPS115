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
  bio:String;
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

    this.authService.getOneProfile(this.currentUser.id).subscribe(profile => {
      if(profile.success){
        //flash message for testing, remove later
        // this.flashMessage.show('Account Found!', {cssClass: 'alert-success', timeout: 3000});
        this.username = profile.user.username; // Set username
        this.email = profile.user.email; // Set e-mail
      } else{
        this.flashMessage.show('Profile data failed', {cssClass: 'alert-danger', timeout: 3000});
        // using Username field to test
        // this.username = profile.message;
      }

    })
  }

}
