import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  location: String;
  date: String;
  time: String;
  payrate: Number;
  details: String;

  constructor(
    private flashMessage:FlashMessagesService,
    private postService:PostService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onPostSubmit() {
    const post = {
      location: this.location,
      date: this.date,
      time: this.time,
      payrate: this.payrate,
      details: this.details
    }

    this.postService.newPost(post).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Job posted!', {cssClass: 'alert-success', timeout: 3000});
      }
      else {
        this.flashMessage.show('Job posting failed', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}
