import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  // username = '';
  // email = '';

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      // this.username = profile.user.username; // Set username
      // this.email = profile.user.email; // Set e-mail
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSettingsClick(){
    this.router.navigate(['/settings']);
  }

}
