import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  //user:Object;
  username:String;
  email:String;
  bio:String;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      // this.user = profile.user;
      this.username = profile.User.username; // Set username
      this.email = profile.User.Email; // Set e-mail
      this.bio = profile.User.Bio;
    },
    err => {
      console.log(err);
      return false;
    });
  }


}
