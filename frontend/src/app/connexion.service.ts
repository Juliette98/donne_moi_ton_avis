import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  connectedUser: any = null;
  isConnected = false;

  constructor(private http: HttpClient, public router: Router) {
    this.isLogged();
  }

  login(login: any, password: any): Observable<any>{
    return this.http.post('http://localhost:3000/login', { login, password}, {withCredentials: true});
  }

  logout(): Observable<any>{
    return this.http.get('http://localhost:3000/logout', {withCredentials: true});
  }

  isLogged(): void{
    this.http.get('http://localhost:3000/islogged', { withCredentials: true}).subscribe(
      (connectedUser) => {
        this.connectedUser = connectedUser;
        this.isConnected = true;
        console.log("Connected")
      },
      () => {
        this.router.navigate(["/connexion"]);
        console.log('not connected');
      }
    );
  }

  profil(userId: any): Observable<any>{
    return this.http.get('http://localhost:3000/profil/' + userId);
  }
}
