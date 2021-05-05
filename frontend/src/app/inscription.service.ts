import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  registeredClient: any = null;
  constructor(private http: HttpClient) {
  }

  addClient(clientGender: any, clientFname: any, clientLname: any, clientEmail: any, clientMdp: any, clientBirthday: any): Observable<any>{
    return this.http.post('http://localhost:3000/register',{clientGender, clientFname, clientLname, clientEmail, clientMdp, clientBirthday}, {withCredentials: true});
  }


}
