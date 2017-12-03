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
  user;

  title: String;
  location: any = {};
  payrate: Number;
  details: String;
  createdBy: String;

  today;
  date;
  time;

  autocomplete: google.maps.places.Autocomplete;

  constructor(
    private flashMessage:FlashMessagesService,
    private postService:PostService,
    private authService:AuthService,
    private router:Router,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.today = Date.now();
    this.today = new Date(this.today);
    this.user = this.authService.getProfile(); // Get profile on initialization to associate with post
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  // Updates the location object on autocomplete
  placeChanged(place) {
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      this.location[addressType] = place.address_components[i].long_name;
    }
    this.ref.detectChanges();
  }

  // Returns location formatted as a string for displaying
  locationStringify() {
    var locationstyle = '';
    if(this.location.street_number !== undefined) {
      locationstyle += this.location.street_number + ' ';
    }
    if(this.location.route !== undefined) {
      locationstyle += this.location.route;
    }
    if(this.location.locality !== undefined) {
      locationstyle += ', ' + this.location.locality;
    }
    if(this.location.administrative_area_level_1 !== undefined) {
      locationstyle += ', ' + this.location.administrative_area_level_1;
    }
    if(this.location.postal_code !== undefined) {
      locationstyle += ' ' + this.location.postal_code;
    }
    return locationstyle;
  }

  // Sends a post request
  onPostSubmit() {
    // Check if a location has been picked from autocomplete
    if(Object.keys(this.location).length === 0 && (this.location).constructor == Object) {
      this.flashMessage.show('Please choose a valid address.', {cssClass: 'alert-danger', timeout: 3000});
      window.scrollTo(0, 0);
    } else {
      // Combine date and time inputs to store as complete date object
      this.date = this.date + ' ' + this.time;
      var datetime = new Date(this.date);

      const post = {
        title: this.title,
        locationstyle: this.locationStringify(),
        location: this.location,
        date: datetime,
        payrate: this.payrate,
        details: this.details,
        createdBy: this.user.displayname,
        email: this.user.email
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
  }
}
