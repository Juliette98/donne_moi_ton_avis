import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  constructor(private http: HttpClient) {
  }

  register(gender: any, fname: any, lname: any, login: any, password: any, birthday: any): Observable<any>{
    return this.http.post('http://localhost:3000/register',{gender, fname, lname, login, password, birthday}, {withCredentials: true});
  }

  deleteAccount(userId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/account/' + userId);
  }

  updateAccount(user: any): Observable<any>{
    return this.http.put('http://localhost:3000/account/' + user.id, user);
  }
}
