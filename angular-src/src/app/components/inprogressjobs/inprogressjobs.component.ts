import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { PostService} from '../../services/post.service';

@Component({
  selector: 'app-inprogressjobs',
  templateUrl: './inprogressjobs.component.html',
  styleUrls: ['./inprogressjobs.component.css']
})
export class InprogressjobsComponent implements OnInit {

  allPosts;
  username;

  constructor(
    private postService: PostService,
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(data => {
      this.allPosts = data.posts;
    })
  }

  ngOnInit() {
    // Get profile username on page load
   this.authService.getProfile().subscribe(profile => {
     this.username = profile.user.username; // Used when creating new blog posts and comments
   });
    this.getAllPosts();
  }

}
