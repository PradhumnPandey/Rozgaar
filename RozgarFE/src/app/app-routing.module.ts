import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { BidsComponent } from './bids/bids.component';
import { EditProfileComponent } from './Auth/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { JobModalComponent } from './job-modal/job-modal.component';
import { JobsComponent } from './Jobs/jobs.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'bids', component:BidsComponent},
  {path:'editprofile',component:EditProfileComponent},
  {path:'home',component:HomeComponent},
  {path: 'jobs', component:JobsComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
