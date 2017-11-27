import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-completedjobs',
  templateUrl: './completedjobs.component.html',
  styleUrls: ['./completedjobs.component.css']
})
export class CompletedjobsComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

}
