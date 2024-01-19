import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Job } from 'src/Model/Job';
import { AuthService } from '../services/Auth/auth.service';
import { JobServiceService } from '../services/Job/job-service.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private _serv : JobServiceService, private _authServ : AuthService,private toast: NgToastService) { }
  jobs : Job[] = []
  filterJob : Job[] = []
  usr : any 
  totalEarning : number = 0
  inProgress : number = 0
  completed : number = 0
  ngOnInit(): void {
    this._authServ.getUser(sessionStorage.getItem('contactNo') || '').subscribe
    (
      usr => this.usr = usr,
      err=>{
        this.toast.error({detail:"User Details Cannot Be Fetched", summary:err.error, duration:6000})
      },
      ()=>{
        this._serv.getJobbyLabour(this.usr?.id || 0).subscribe(
        jobs => 
        {
          this.filterJob = jobs.sort((a,b) => 
          {
            if(a.id == null || b.id == null) return 0;
            return b.id - a.id;
          }
          )
          this.jobs = jobs
          this.total()
        },
        err =>
        {
          this.toast.error({detail:"Job Details Cannot Be Fetched", summary:err.error, duration:6000})
        }
      )}
    )
  }

  update(job : Job, stat : String)
  {
    job.status = stat
    this._serv.updateJob(job).subscribe(
      succ =>
      {
        if(succ) this.toast.info({detail:"Job Status", summary:"Job #"+job.id+" Status Changed to "+stat})
        else this.toast.error({detail:"Job Status", summary:"Failed to update job #"+job.id+" status.. Please try again"})
      },
      err=> {
        this.toast.error({detail:"Job Status", summary:err.error, duration:6000})
      },
      () => this.ngOnInit()
    )
    this.total()
  }

  filter(fil : String)
  {
    if(fil == 'A')
    this.filterJob = this.jobs.filter(
      (data)=>
      {
        return data.status == 'Pending'
      }
    )
    else if(fil == 'P')
      this.filterJob = this.jobs.filter(
        (data)=>
        {
          return data.status == 'Accepted'
        }
      )
    else
        this.filterJob = this.jobs.filter(
          (data)=>
          {
            return data.status == 'Completed' || data.status == 'Rejected'
          }
        )
  }

  total()
  {
    this.totalEarning = 0
    this.completed = 0
    this.inProgress = 0

    for(var job of this.jobs)
    {
      if(job.status == 'Completed')
      {
        console.log(job.amount)
        this.totalEarning += job.amount
        this.completed += 1
      }
      if(job.status == 'Accepted')
        this.inProgress +=1
    }
  }


}
