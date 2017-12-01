import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  updatePostSubmit() {

  }

  // Saves new changes to selected post
  save() {

  }

  // Deletes post
  delete() {

  }

  // Goes back to dashboard page without changing post
  cancel() {
    this.router.navigate(['/dashboard'])
  }

}
