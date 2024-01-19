import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private _authService : AuthService, private toast:NgToastService) {
    this._authService.getUser(sessionStorage.getItem('contactNo') || '').subscribe
    (
      usr => {
        this.id = usr.id
        this.name = usr.name
        this.age = usr.age
        this.prof = usr.prof
        this.contactNo = usr.contactNo
        this.isLabour = usr.labour
        this.location = usr.location
        this.password = usr.password
      },
      err => {
        this.toast.error({detail:"Fetching User Data Failed",summary:err.error, duration:5000})
      },
    )
   }
   
  isLabour? : Boolean
  name? : String
  age? : number
  prof? : String
  contactNo : String = ''
  location : String = ''
  password? : String
  id? : number = 0
  ngOnInit(): void {
   
  }

  submit()
  {
    let usr:User = {id:this.id,name:this.name, contactNo:this.contactNo,location : this.location, age : this.age, password : this.password,prof : this.prof } 
    this._authService.edit(usr).subscribe
    (
      succ => {
        if(succ)
          this.toast.success({detail: "Update Profile", summary: "Data Saved Successully", duration:5000})
        else
          this.toast.error({detail: "Update Profile", summary:"Data Could Not Be Saved.. Try Again Later"})
      },
      err=>{
        this.toast.error({detail:"Update Profile",summary:err.error, duration:5000})
      },
      ()=>{this.ngOnInit()}
    )
  }


}
