import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  time;
  allPosts;
  user;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService
  ) {
    this.getAllPosts();
  }

  ngOnInit() {
    this.user = this.authService.getProfile();
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      if(!data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
      } else {
        this.allPosts = data.posts;
      }
    })
  }

  // Navigates to post form
  post() {
    this.router.navigate(['/posts'])
  }

  // Deletes post
  deletePost(id) {
    if(confirm("Are you sure you want to delete your post?")) {
      this.postService.deletePost(id, this.user).subscribe(data => {
        if(!data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-success',timeout: 2000});
          this.getAllPosts();
          setTimeout(() => {
          this.router.navigate(['/dashboard']);
          }, 2000);
        }
      })
    }
  }

}
