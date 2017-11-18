import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  allPosts;

  constructor(
    private postService: PostService
  ) {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.allPosts = data.posts;
    })
  }

  ngOnInit() {
    this.getAllPosts();
  }

}
