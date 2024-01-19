import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Job } from 'src/Model/Job';
import { JobServiceService } from '../services/Job/job-service.service';



@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})

export class JobModalComponent implements OnInit {

  lbr : any
  price : number = 0
  desc : any
  usr : any
  date : Date = new Date()
  dia : any
  add : any
  show:boolean = false
  btn : boolean = true
  constructor(private toast:NgToastService,private _route : Router,@Inject(MAT_DIALOG_DATA) public data : any, private serv : JobServiceService) { }
  ngOnInit(): void {
    this.lbr = this.data.lbr
    this.usr = this.data.usr
    this.dia =  this.data.dia
  }
  
  
  submit()
  {
    let job : Job = {custId : this.usr.id, labourId : this.lbr.id, descp : this.usr.name+"||"+this.usr.contactNo+"||"+this.add+"||"+this.desc, amount : this.price, status : "Pending"}
    this.serv.addJob(job).subscribe
    (
      res =>{
        if(res) this.toast.info({detail:"Bid Status", summary:"bid has been placed"})
        else this.toast.info({detail:"Bid Status", summary:"bid could not be placed, Please try again"})
      },
      err => {
        this.toast.error({detail:"Bid Status", summary:err.error, duration:6000})
      },
      ()=>{
          this.btn = false
      }
    )
  }
}
