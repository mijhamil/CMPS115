import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  allPosts;
  username;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.getAllPosts();
  }

  getAllPosts() {
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
