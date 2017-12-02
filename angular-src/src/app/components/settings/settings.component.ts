import { Component, OnInit } from '@angular/core';
//import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';
import {ValidateService} from '../../services/validate.service';
import { userInfo } from 'os';
import { PassThrough } from 'stream';
import { TemplateParseResult } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user'));
  //form placeholder values in case of no db entries
  _plName = "First Last";
  _plCurrPswd = "Current Password";
  _plRePswd = "Retype New Password";
  _plNewPswd = "New Password";    
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
  // hideNewPw = true; // if true, second pw field is hidden  
  hideRePw = true; // if true, repeat pw field is hidden
  newPwWarning = false; // warm user in new pw is too short
  rePwWarning = true; // warn user if repeated pw doesn't match
  currPwWarning = false; // warn user if current pw they entered isn't right

  //vars to store form fields
  _formName:string;
  _formBio:string;
  _formImgLink:string;
  _formCurrPswd:string;
  _formNewPswd:string;  
  _formRePswd:string;

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router,
    private location:Location
  ) { 

  }

  ngOnInit() {
    this.getSettings();
  }

  // //change the value of hideRePw to show/hide second pw field
  // setHideNewPw(){
  //   if(this._formCurrPswd && this._formCurrPswd!=""){
  //     this.hideNewPw = false;
  //     //this.newPwWarning = true;
  //     this.currPwWarning = false;
  //   }
  //   else{
  //     this.hideNewPw = true;
  //   }
  // }

  //change the value of hideRePw to show/hide second pw field
  setHideRePw(){
    if(this._formNewPswd && !(this._formNewPswd=="")){
      this.hideRePw = false;
      if(this._formNewPswd.length < 6){
        this.newPwWarning = true;
      }
      else{
        this.newPwWarning = false;
      }
    }
    else{
      this.hideRePw = true;
    }
  }

  //show or hide new password and retyped apssword match warning
  setRePwWarning(){
    if(this._formNewPswd == this._formRePswd){
      this.rePwWarning = false;
    }
    else{
      this.rePwWarning = true;
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
    //make sure current pw is entered to save settings
    if(!this._formCurrPswd || this._formCurrPswd == ""){
      this.flashMessage.show('Please enter your current password to save settings', {cssClass: 'alert-danger', timeout: 3000});      
      return false;
    }
    if(this._formNewPswd && this._formNewPswd!=""){
      if(this._formNewPswd.length < 6){
        //this.flashMessage.show('New password must be at least 6 characters long', {cssClass: 'alert-danger', timeout: 3000});
        return false;              
      }
      else if(this._formNewPswd != this._formRePswd){
        this.rePwWarning = true;
        //this.flashMessage.show('New password does not match repeated password', {cssClass: 'alert-danger', timeout: 3000, close:'true',});
        return false;  
      }
    }

    //check current password
    if(this._formCurrPswd && this._formCurrPswd!=""){
      //compare hashes
      const passes = {
        plainPass:this._formCurrPswd,
        passHash:this.oldPwHash
      }
      this.authService.compPwords(passes).subscribe(data => {
        if(data.success!=true){
          this.currPwWarning=true;
          return false;
        }
        else{
          //this.flashMessage.show('hashes are equal', {cssClass: 'alert-danger', timeout: 3000});
          this.submitHashing();          
        }
      });
    }
  }

  submitHashing(){
    //make temp user object to pass into updateSettings() in authService
    var tempName = "";
    if(this._formName && this._formName!=""){tempName=this._formName}
    else if(this.name!=this._plName){tempName=this.name}
    var tempBio = "";
    if(this._formBio && this._formBio!=""){tempBio=this._formBio}
    else if(this.bio!=this._plBio){tempBio=this.bio}
    var tempImgLink = "";
    if(this._formImgLink && this._formImgLink!=""){tempImgLink=this._formImgLink}
    else if(this.imgLink!=this._plImgLink){tempImgLink=this.imgLink}
    var tempPswd = this.oldPwHash;

    //if new pw is entered, hash and pass tempUser into authService.updateSettings(tempUser)
    if(this._formNewPswd && this._formNewPswd!=""){
      this.authService.hashPw(this._formNewPswd).subscribe(data => {
        if(data.success==true){

          var tempUser = {
            name:tempName,
            password: data.message,
            bio: tempBio,
            //skills: this.skills,
            imgLink: tempImgLink,
            id: this.currentUser.id
          }
            this.finishSubmit(tempUser);
        }
        else{
          this.flashMessage.show('password save failure', {cssClass: 'alert-danger', timeout: 3000});
          return false;          
        }
      });
    }
    //if no new pw entered, use old pw hash as tempUser's pw and pass tempUser into authService.updateSettings(tempUser)
    else{
      var tempUser = {
        name:tempName,
        password: tempPswd,
        bio: tempBio,
        //skills: this.skills,
        imgLink: tempImgLink,
        id: this.currentUser.id
      }
      this.finishSubmit(tempUser);
    }
  }

  finishSubmit(tempUser){
    //call updateSetiings function to update the db with the tempUser passed in
    this.authService.updateSettings(tempUser).subscribe(data => {
      if (data.success){
        this.router.navigate(['/profile']);
      }
      else{
        this.flashMessage.show('database update error', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
  
}


