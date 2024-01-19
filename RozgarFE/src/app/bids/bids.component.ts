import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { JobServiceService } from '../services/Job/job-service.service';
import { User } from 'src/Model/User';
import { Job } from 'src/Model/Job';
import { NgToastService } from 'ng-angular-popup';
import { iif } from 'rxjs';
import { identifierName } from '@angular/compiler';
import { TitleStrategy } from '@angular/router';
@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  constructor(private _serv : JobServiceService, private _authService : AuthService, private toast : NgToastService) { }
  bids : any = []
  usr:any
  lbr: User[] = []
  filterId : String = ""
  filterData:Job[] = []

  ngOnInit(): void {
    this._authService.getUser(sessionStorage.getItem('contactNo') || '').subscribe(
      usr => this.usr = usr,
      err => {},
      () =>
      {
        this._serv.getJob(this.usr.id).subscribe(
          bids => 
          {
            this.bids = bids.sort((a,b) => 
            {
              if(a.id == null || b.id == null) return 0;
              return b.id - a.id;
            })
          },
          err => {},
          ()=> {this.filterData = this.bids}
        )
      }
    )

    this._authService.getLabour().subscribe(
      lbr => 
      {
        this.lbr = lbr
      }
    )
  }

  name(id : number) : String
  {
      let name = this.lbr.filter(
        (data) => {return data.id == id}
      )

      return name[0].name?.toString() || ""
  }

  filter()
  {
    this.bids = this.filterData.filter(
      (data) =>
      {
        if(this.filterId == "") return true;
        return data.id?.toString().includes(this.filterId.toString())
      }
    )
  }

  delete(id : number)
  {
    this._serv.deleteJob(id).subscribe(
      succ => {
        if(succ) this.toast.info({detail:"Job Update", summary:"Job #"+id+" has been deleted"})
        else this.toast.error({detail:"Job Update", summary: "Failed to delete job #" + id})
      },
      err=>{},
      () => {this.ngOnInit()}
    )
  }

  complete(job : Job)
  {
    job.status = 'Completed'
    job.bidDate = new Date()
    this._serv.updateJob(job).subscribe(
      succ =>
      {
        if(succ) this.toast.success({detail:"Job Update", summary:"Job #"+job.id+" Status Changed to Completed"})
        else this.toast.error({detail:"Job Update", summary: "Failed to Change Status of job #" + job.id})
      },
      err =>
      {
        this.toast.error({detail:"Job Update", summary:err.error})
      }
    )
  }

}
