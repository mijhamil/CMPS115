import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-managejobs',
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})
export class ManagejobsComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  pendingRequestsRedirect(){
    this.router.navigate(['/pending-requests'])
  }

  inProgressRedirect(){
    this.router.navigate(['/in-progress-jobs'])
  }

  completedRedirect(){
    this.router.navigate(['/completed-jobs'])
  }

  cancelledRedirect(){
    this.router.navigate(['/cancelled-jobs'])
  }

  ngOnInit() {
  }

}
