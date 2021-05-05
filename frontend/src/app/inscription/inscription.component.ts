import { Component, OnInit } from '@angular/core';
import {InscriptionService} from "../inscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  logoPath: any;
  gender: string = "";
  fname: string = "";
  lname: string = "";
  login: string = "";
  password: string = "";
  birthday: Date = new Date("01-01-1993");

  constructor(public inscriptionService: InscriptionService, public router: Router) { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

  register(): void {
       this.inscriptionService.register(this.gender,this.fname,this.lname,this.login,this.password,this.birthday).subscribe(
         () => {
           this.router.navigate(['/connexion'])
         },
         (error: any) => {
        console.log('error', error);
      }
    );
  }
}

