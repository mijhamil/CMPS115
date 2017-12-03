import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {

  domain;

  constructor(
    private http: Http,
    private authService: AuthService
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

  // Retrieves a single post with specified ID from the database
  retrievePost(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/' + 'posts/singlePost/' + id, {headers: headers}).map(res => res.json());
  }

  // Updates a post with supplied object
  updatePost(user, post) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/' + 'posts/updatePost/' + user.displayname, post, {headers: headers}).map(res => res.json());
  }

  // Deletes post with specified ID from the database
  deletePost(id, user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://localhost:3000/' + 'posts/deletePost/' + user.displayname + '/' + id, {headers: headers}).map(res => res.json());
  }
}
