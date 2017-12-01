import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title: String;
  location: any = {};
  locationstyle: String;
  date: String;
  time: String;
  payrate: String;
  details: String;
  user;
  autocomplete: google.maps.places.Autocomplete;
  center: any;

  constructor(
    private flashMessage:FlashMessagesService,
    private postService:PostService,
    private authService:AuthService,
    private router:Router,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.user = JSON.parse(this.authService.getProfile()); // Get profile on initialization to associate with post
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  // Updates the location object on autocomplete
  placeChanged(place) {
    this.center = place.geometry.location;
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      this.location[addressType] = place.address_components[i].long_name;
    }
    this.ref.detectChanges();
  }

  // Formats the location as a string for displaying
  locationStringify() {
    this.locationstyle = '';
    if(this.location.street_number !== undefined) {
      this.locationstyle += this.location.street_number;
    }
    if(this.location.route !== undefined) {
      this.locationstyle += ' ' + this.location.route;
    }
    if(this.location.locality !== undefined) {
      this.locationstyle += ', ' + this.location.locality;
    }
    if(this.location.administrative_area_level_1 !== undefined) {
      this.locationstyle += ', ' + this.location.administrative_area_level_1;
    }
    if(this.location.postal_code !== undefined) {
      this.locationstyle += ' ' + this.location.postal_code;
    }
  }

  // Sends a post request
  onPostSubmit() {
  this.locationStringify();

  console.log(this.user.username);
  const post = {
    title: this.title,
    locationstyle: this.locationstyle,
    location: this.location,
    date: this.date,
    time: this.time,
    payrate: this.payrate,
    details: this.details,
    createdBy: this.user.username
  }

  this.postService.newPost(post).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('Job posted!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/dashboard']);
    }
    else {
      this.flashMessage.show('Job posting failed', {cssClass: 'alert-danger', timeout: 3000});
    }
  })
}

// Formats the payrate input field, removing invalid characters and adding a dollar sign
formatPay() {
    var pay = this.payrate;

    pay = pay.replace(/[^0-9.]/,'');
    if (pay.indexOf("$") != 0 && pay.length != 0)
    {
      pay = pay.replace(/$/, '')
      pay = "$" + pay;
    }

    this.payrate = pay;
  }
}
