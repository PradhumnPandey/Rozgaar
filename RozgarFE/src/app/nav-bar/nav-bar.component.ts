import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private _route : Router,private authService : AuthService) { }
  isLoggedIn : Boolean = false
  labour? : Boolean
  user :any
  ngOnInit(): void {
    if(sessionStorage.getItem('contactNo') != null)
    {
      this.isLoggedIn = true
      this.authService.getUser(sessionStorage.getItem('contactNo')?.toString() || '').subscribe
      (
        user => {this.user = <User>user
        console.log(user)},
        error =>{},
        () => { this.labour = this.user.labour
        }
      )
    }
  }

  logOut()
  {
    sessionStorage.clear();
    this._route.navigate(['\login'])
  }

}
