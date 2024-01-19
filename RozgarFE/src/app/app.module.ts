import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './Auth/edit-profile/edit-profile.component';
import {HttpClientModule} from '@angular/common/http'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobModalComponent } from './job-modal/job-modal.component';
import { BidsComponent } from './bids/bids.component'
import {MatTableModule} from '@angular/material/table';
import { JobsComponent } from './Jobs/jobs.component'
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    HomeComponent,
    EditProfileComponent,
    JobModalComponent,
    BidsComponent,
    JobsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
