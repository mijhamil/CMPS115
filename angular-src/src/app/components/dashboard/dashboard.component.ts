import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: String;
  location: any = {};
  date: String;
  time: String;
  payrate: String;
  details: String;
  username;
  autocomplete: google.maps.places.Autocomplete;
  center: any;

  constructor(
    private flashMessage:FlashMessagesService,
    private postService:PostService,
    private router:Router,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  placeChanged(place) {
    this.center = place.geometry.location;
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      this.location[addressType] = place.address_components[i].long_name;
    }
    this.ref.detectChanges();
  }

  // Sends a post request
  onPostSubmit() {
    const post = {
      title: this.title,
      location: JSON.stringify(this.location), // JSON.stringify(this.location),
      date: this.date,
      time: this.time,
      payrate: this.payrate,
      details: this.details,
      createdBy: this.username
    }

    this.postService.newPost(post).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Job posted!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/posts']);
      }
      else {
        this.flashMessage.show('Job posting failed', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  // Formats the payrate input field with a dollar sign in front
  formatPay() {
    var pay = this.payrate;

    pay = pay.replace(/\D/g,'');
    if (pay.indexOf("$") != 0 && pay.length != 0)
    {
      pay = pay.replace(/$/, '')
      pay = "$" + pay;
    }

    this.payrate = pay;
  }
}
