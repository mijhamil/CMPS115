import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  loading = true;
  user;
  currentUrl;

  autocomplete;

  post;
  location;
  date;
  time;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.postService.retrievePost(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
      } else {
        this.post = data.post;
        this.post.locationstyle = this.post.locationstyle + ', ' + this.post.location[0].country;
        var t = new Date(this.post.date);
        this.date = t.getFullYear() + '-' + (t.getUTCMonth()+1) + '-' + t.getUTCDate();
        this.time = (t.getUTCHours()+1) + ':' + (t.getMinutes()+1);
        console.log(t.toString());
        console.log(t.toTimeString());
        this.loading = false;
      }
    })
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }

  // Updates the location object on autocomplete
  placeChanged(place) {
    for (let i = 0; i < place.address_components.length; i++) {
      let addressType = place.address_components[i].types[0];
      this.location[addressType] = place.address_components[i].long_name;
    }
    this.ref.detectChanges();
  }

  // Saves new changes to selected post
  save() {
    window.scrollTo(0, 0);
    this.postService.updatePost(this.post).subscribe(data => {
      if(!data.success) {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
      } else {
        this.flashMessage.show(data.message, {cssClass: 'alert-success',timeout: 2000});
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    })
  }

  // Deletes post
<<<<<<< HEAD
  deletePost() {
    if(confirm("Are you sure you want to delete your post?")) {
      window.scrollTo(0, 0);
      this.postService.deletePost(this.currentUrl.id, this.user).subscribe(data => {
        if(!data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger',timeout: 5000});
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-success',timeout: 2000});
          setTimeout(() => {
          this.router.navigate(['/dashboard']);
          }, 2000);
        }
      })
    }
=======
  delete() {

>>>>>>> ecf13db03c2a43cc334bcd2d2c4da3feb2d7ad23
  }

  // Goes back to dashboard page without changing post
  cancel() {
    this.router.navigate(['/dashboard'])
  }

}
