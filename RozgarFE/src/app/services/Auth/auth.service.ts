import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs'
import { User } from 'src/Model/User';
import {HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  addUser(user:User): Observable<Boolean>
  {
    console.log(user)
    return this.http.post<boolean>("https://192.168.29.120/addUser",user);
  }
  getUser(contactNo : String):Observable<User>
  {
    return this.http.get<User>("https://192.168.29.120/getUser?cn="+ contactNo);
  }

  getLabour():Observable<User[]>
  {
    return this.http.get<User[]>("https://192.168.29.120/getLabour");
  }
  getUserById(id : number) : Observable<User>
  {
    return this.http.get<User>("https://192.168.29.120/getUserId?id=100"+ id);
  }
  edit(usr : User) : Observable<Boolean>
  {
    console.log(usr)
    return this.http.put<Boolean>('https://192.168.29.120/edit', usr);
  }
}
