import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Job } from 'src/Model/Job';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private http : HttpClient) { }

  addJob(job : Job) : Observable<Boolean>
  {
      return this.http.post<Boolean>('https://192.168.29.120/addJob', job);
  }
  getJob(id : number) : Observable<Job[]>
  {
    return this.http.get<Job[]>('https://192.168.29.120/getAllJob?id='+id)
  }
  deleteJob(id : number):Observable<Boolean>
  {
    return this.http.delete<Boolean>('https://192.168.29.120/deleteJob?id=' + id);
  }
  getJobbyLabour(id : number):Observable<Job[]>
  {
    return this.http.get<Job[]>('https://192.168.29.120/getJobbyLabour?id='+id);
  }
  updateJob(job : Job):Observable<Boolean>
  {
    return this.http.put<Boolean>('https://192.168.29.120/updateJob',job);
  }
}
