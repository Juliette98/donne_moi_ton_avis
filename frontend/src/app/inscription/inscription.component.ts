import { Component, OnInit } from '@angular/core';
import {InscriptionService} from "../inscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  gender: string[] = ['Femme', 'Homme'];
  logoPath: any;

  clientGender: string = "";
  clientFname: string = "";
  clientLname: string = "";
  clientEmail: string = "";
  clientMdp: string = "";
  clientBirthday: string = "";

  constructor(public inscriptionService: InscriptionService, public router: Router) { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

  addNote(): void {
       this.inscriptionService.addClient(this.clientBirthday,this.clientMdp,this.clientEmail,this.clientLname,this.clientFname,this.clientGender).subscribe(
         () => {
           this.router.navigate(['/connexion'])

         },
         (error: any) => {
        console.log('error', error);
      }
    );
  }
}

