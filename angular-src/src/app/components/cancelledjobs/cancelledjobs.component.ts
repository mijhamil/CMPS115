import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-cancelledjobs',
  templateUrl: './cancelledjobs.component.html',
  styleUrls: ['./cancelledjobs.component.css']
})
export class CancelledjobsComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

}
