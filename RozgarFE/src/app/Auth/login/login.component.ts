import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _route : Router, private _authService : AuthService, private toast:NgToastService) { }
  isLoggedIn = sessionStorage.getItem('contactNo')

  loginForm = new FormGroup(
    {
      contactNumber : new FormControl(''),
      pwd : new FormControl('')
    }
  )

  ngOnInit(): void {
      if(this.isLoggedIn != null)
        this._route.navigate(['/home'])
  }

  submit()
  {
    this._authService.getUser(this.loginForm.value.contactNumber || '').subscribe
    (
      user => 
      { 

          if(user.password == this.loginForm.value.pwd?.toString())
          {
          this.toast.success({detail:"Success",summary:"Logged In Successfully",duration:5000})
          sessionStorage.setItem('contactNo',user.contactNo.toString())
          this._route.navigate(['/home'])
          }
          else
          this.toast.error({detail:"Failed",summary:"Invalid Credentials",duration:5000})
      },
      error => {
        this.toast.error({detail:"Failed",summary:error.error,duration:5000})},
      () => {}
    )
       
  }

}
