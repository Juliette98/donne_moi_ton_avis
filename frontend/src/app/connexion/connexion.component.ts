import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../connexion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  logoPath: any;
  login: any = '';
  password: any = '';

  constructor(public connexionService: ConnexionService, public router: Router) { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

  submit(): any{
    this.connexionService.login(this.login, this.password).subscribe(
      (userInfo: any) => {
        this.connexionService.connectedUser = userInfo;
        this.router.navigate(['/accueil'])

      },
      (error) => {
        console.log('error', error);
      }
    );
  }

}
