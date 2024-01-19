import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/Model/User';
import { JobModalComponent } from '../job-modal/job-modal.component';
import { AuthService } from '../services/Auth/auth.service';
declare var window : any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = sessionStorage.getItem('contactNo')
  filteredData : User[] = []
  locSel : String = ""
  profSel: String = ""
  worker : User[] = []
  jobWindow : any
  user : any

  constructor(private _route : Router,private _serv : AuthService, private dialogRef : MatDialog, private toast:NgToastService) { }

  ngOnInit(): void {
    if(this.isLoggedIn == null)
        this._route.navigate(['/login'])
    else
    this._serv.getUser(this.isLoggedIn).subscribe
    (
      usr => { this.user = usr},
      err =>
      {
        this.toast.error({detail:"User Detail Cannot Be Fetched", summary:err.error, duration:6000})
      }
      
    )
        
    this._serv.getLabour().subscribe(
      data => {
        this.worker = data
        console.log(data)
        this.filteredData = this.worker
        let prof = new Set();
        for(let p of this.worker)
        {
          prof.add(p.prof);
        }
      },
      err => this.toast.error({detail:"Users Detail Cannot Be Fetched", summary:err.error, duration:6000})
    );


  }


  filter()
  {
    this.filteredData = this.worker.filter((data) => 
    {
      if(this.locSel == "" && this.profSel == "")
        return true;
      if(this.locSel!="" && this.profSel != "")
        return data.location.toLowerCase().includes(this.locSel.toLowerCase()) && data.prof?.toLowerCase().includes(this.profSel.toLowerCase()); 
      if(this.locSel != "")
        return data.location.toLowerCase().includes(this.locSel.toLowerCase());
      if(this.profSel != "")
        return data.prof?.toLowerCase().includes(this.profSel.toLowerCase());
      return true;
    }
    );
  }

  openDialog(lbr : User, usr : User)
  {
    this.dialogRef.open(JobModalComponent,{data : {lbr : lbr,usr : this.user, dia : this.dialogRef} })
  }

  stars(count : number)
  {
    count = Math.round(count)
    if(count == 1)
    return "*"
    if(count == 2)
    return "**"
    if(count == 3)
    return "***"
    if(count == 4)
    return "&#9733;"
    return "*****"
  }
}
