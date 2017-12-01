import { Component, OnInit } from '@angular/core';
//import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ValidateService} from '../../services/validate.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));

  //form placeholder values in case of no db entries
  _plName = "First Last";
  _plPswd = "password";
  _plRePswd = "Retype Password";  
  _plBio = "Who even, like, are you?";
  //_plSkills = ["phone repair", "knitting", "cooking"];
  _plImgLink = "https://i.imgur.com/6eOlEUB.jpg";

  //final vars to display as placeholders in forms
  name:string;
  oldPwHash:string;
  email:string;
  username:string;
  bio:string;
  imgLink:string;

  changes = false; // track if there are changes to the form (not implemented)
  hideRePw = true; // if true, second pw field is hidden

  //vars to store form fields
  _formName:string;
  _formBio:string;
  _formImgLink:string;
  _formPswd:string;
  _formRetypedPwsd:string;

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit() {
    this.getSettings();
  }

  //change the value of hideRePw to show/hide second pw field
  setHideRePw(){
    if(this._formPswd && !(this._formPswd=="")){
      this.hideRePw = false;      
    }
    else{
      this.hideRePw = true;
    }
  }

  //go back to previous page on cancel button press
  goBack(tf){
    if(tf){
      this.location.back();
    }
  }

  //for showing the "save settings" button when user types in fields
  noticeChanges(){
    this.changes = true;
  }

  //load existing settings into vars to act as placeholders
  getSettings() {
    this.authService.getOneProfile(this.currentUser.id).subscribe(profile => {
      if(profile.success){
        if(profile.user.name){this.name = profile.user.name;} // Set components name var to db entry
        else if(!this.name){this.name = this._plName} //set to placeholder if no name in db
        this.username = profile.user.username;
        this.oldPwHash = profile.user.password;
        if(profile.user.bio){this.bio = profile.user.bio;} // Set component's bio var to db entry
        else if(!this.bio){this.bio = this._plBio} //set to placeholder if no bio in db        
        if(profile.user.imgLink){this.imgLink = profile.user.imgLink;} // Set component's imgLink var to db entry
        else if(!this.imgLink){this.imgLink = this._plImgLink} //set to placeholder if no bio in db                
      } else{
        this.flashMessage.show('Settings data error', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  //send a put request to save settings from form
  onSettingsSubmit(){
    var tempName = "";
    if(this._formName){tempName=this._formName}
    else if(this.name && this.name!=this._plName){tempName=this.name}
    var tempBio = "";
    if(this._formBio){tempBio=this._formBio}
    else if(this.bio && this.bio!=this._plBio){tempBio=this.bio}
    var tempImgLink = "";
    if(this._formImgLink){tempImgLink=this._formImgLink}
    else if(this.imgLink  && this.imgLink!=this._plImgLink){tempImgLink=this.imgLink}
    const tempUser = {
      name:tempName,
      //password: this.password,
      bio: tempBio,
      //skills: this.skills,
      imgLink: tempImgLink,
      id:this.currentUser.id
    }
    // if(!this.validateService.validateURL(user.imgLink)){
    //   this.flashMessage.show('Please enter a valid web address of an image', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }
    this.authService.updateSettings(tempUser).subscribe(data => {
      if (data.success){
        //this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 50000});
        this.router.navigate(['/profile']);
      }
      else{
        this.flashMessage.show('database update error', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
