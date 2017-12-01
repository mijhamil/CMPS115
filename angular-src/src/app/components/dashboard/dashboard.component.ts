import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  time;
  allPosts;
  username;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.allPosts = data.posts;
    })
  }

  ngOnInit() {
    // Get profile username on page load
   // this.authService.getProfile().subscribe(profile => {
   //   this.username = profile.user.username; // Used when creating new blog posts and comments
   // });
   this.getAllPosts();
  }

}
