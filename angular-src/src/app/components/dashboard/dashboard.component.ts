import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allPosts;
  username;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router:Router
  ) {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.allPosts = data.posts;
    })
  }

  // Navigates to post form
  post() {
    this.router.navigate(['/posts'])
  }

  // Goes to editing post page
  editPost() {
    this.router.navigate(['/edit-post/'])
  }

  // Deletes post
  deletePost() {

  }

  requestJob() {

  }

  ngOnInit() {
    // Get profile username on page load
   this.authService.getProfile().subscribe(profile => {
     this.username = profile.user.username; // Used when creating new blog posts and comments
   });
    this.getAllPosts();
  }

}
