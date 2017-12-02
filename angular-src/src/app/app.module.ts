import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2MapModule } from 'ng2-map';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { ManagejobsComponent } from './components/managejobs/managejobs.component';
import { PendingrequestsComponent } from './components/pendingrequests/pendingrequests.component';
import { InprogressjobsComponent } from './components/inprogressjobs/inprogressjobs.component';
import { CompletedjobsComponent } from './components/completedjobs/completedjobs.component';
import { CancelledjobsComponent } from './components/cancelledjobs/cancelledjobs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditPostComponent } from './components/dashboard/edit-post/edit-post.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PostService} from './services/post.service'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'posts', component: PostsComponent, canActivate:[AuthGuard]},
  {path:'manage-jobs', component: ManagejobsComponent, canActivate:[AuthGuard]},
  {path:'pending-requests', component: PendingrequestsComponent, canActivate:[AuthGuard]},
  {path:'in-progress-jobs', component: InprogressjobsComponent, canActivate:[AuthGuard]},
  {path:'completed-jobs', component: CompletedjobsComponent, canActivate:[AuthGuard]},
  {path:'cancelled-jobs', component: CancelledjobsComponent, canActivate:[AuthGuard]},
  {path:'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path:'edit-post/:id', component: EditPostComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PostsComponent,
    ManagejobsComponent,
    PendingrequestsComponent,
    InprogressjobsComponent,
    CompletedjobsComponent,
    CancelledjobsComponent,
    SettingsComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDyT7qAyvh1f6NiNPSILMd3CyNQYj6dYK4&libraries=visualization,places,drawing'})
  ],
  providers: [ValidateService, AuthService, PostService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
