import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {

  domain;

  constructor(
    private http: Http
  ) { }

  // Creates a new post
  newPost(post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/' + 'posts/newPost', post, {headers: headers}).map(res => res.json());
  }

  // Retrieves all posts in the database
  getAllPosts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/' + 'posts/allPosts', {headers: headers}).map(res => res.json());
  }
}
