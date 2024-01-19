import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _router:Router,private _authService:AuthService, private toast:  NgToastService) { }

  isLoggedIn = sessionStorage.getItem('contactNo')
  isLabour : Boolean = false
  regForm = new FormGroup(
    {
      Name : new FormControl(''),
      age : new FormControl(''),
      prof: new FormControl(''),
      contactNo: new FormControl(''),
      password: new FormControl(''),
      location : new FormControl('')
    }
  )

  ngOnInit(): void {
    if(this.isLoggedIn != null)
        this._router.navigate(['/home'])
  }
  submit()
  {
    console.log(this.regForm.value)
    let user = <User>this.regForm.value
    user.labour = this.isLabour
    user.age = user.age || 0
    this._authService.addUser(user).subscribe
    (
      succ => {
        if(succ)
          this.toast.success({detail:"User Account Created",summary: "Redirecting to Login Page..",duration:5000})
        else
          this.toast.error({detail:"User Account Not Created", summary:"Something Went wrong while creating account! Please try again", duration:6000})
      },
      error => {
        this.toast.error({detail:"User Account Not Created",summary:error.error, duration:10000})
      },
      () => { this._router.navigate(['/login']) }
    )
  }

}
