import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'
import { PostService } from '../../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [DatePipe],
})
export class EditPostComponent implements OnInit {

  loading = true;
  user;
  currentUrl;
  post;

  autocomplete: google.maps.places.Autocomplete;
  location: any = {};
  locationstyle;
  time;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private postService: PostService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Get user info for authentication
    this.user = this.authService.getProfile();

    this.locationstyle = "dsad";
    // Load the post in for editing
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.postService.retrievePost(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
      } else {
        this.post = data.post;
        this.locationstyle = this.post.locationstyle + ', ' + this.post.location[0].country;
        this.time = new Date(this.post.date);
        this.time = this.datePipe.transform(this.time, 'HH:mm');
        console.log(this.locationstyle);
        this.loading = false;
      }
    })
  }

  // Initialize Google Places autocomplete
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

  // Saves new changes to selected post
  save() {
    // Combine date and time input to store as complete date object
    this.post.date = this.datePipe.transform(this.post.date, 'yyyy-MM-dd') + ' ' + this.time;
    this.post.date = new Date(this.post.date);

    if(this.location !== undefined) {
      console.log('A');
      this.locationStringify();
      this.post.location = this.location;
      this.post.locationstyle = this.locationstyle;
    }
    window.scrollTo(0, 0);
    this.postService.updatePost(this.post).subscribe(data => {
      if(!data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
      } else {
        this.flashMessage.show(data.message, {cssClass: 'alert-success',timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    })
  }

  // Deletes post
  deletePost() {
    if(confirm("Are you sure you want to delete your post?")) {
      window.scrollTo(0, 0);
      this.postService.deletePost(this.currentUrl.id, this.user).subscribe(data => {
        if(!data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-success',timeout: 2000});
          setTimeout(() => {
          this.router.navigate(['/dashboard']);
          }, 2000);
        }
      })
    }
  }

  // Goes back to dashboard page without changing post
  cancel() {
    this.router.navigate(['/dashboard'])
  }
}
