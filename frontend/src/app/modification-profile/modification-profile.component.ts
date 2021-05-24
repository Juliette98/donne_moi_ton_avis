import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../connexion.service";
import {InscriptionService} from "../inscription.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modification-profile',
  templateUrl: './modification-profile.component.html',
  styleUrls: ['./modification-profile.component.scss']
})
export class ModificationProfileComponent implements OnInit {
  id: any;
  gender: any;
  fname: any;
  lname: any;
  login: any;
  password: any;
  birthday: any;

  constructor(public connexionService: ConnexionService, public inscriptionService: InscriptionService, public router: Router) { }

  ngOnInit(): void {
    this.id = this.connexionService.connectedUser._id;
    this.gender = this.connexionService.connectedUser.gender;
    this.fname = this.connexionService.connectedUser.fname;
    this.lname = this.connexionService.connectedUser.lname;
    this.login = this.connexionService.connectedUser.login;
    this.birthday = this.connexionService.connectedUser.birthday;
  }

  update(): void {
    let user = {
      id: this.id,
      gender: this.gender,
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      birthday: this.birthday,
    }
    this.inscriptionService.updateAccount(user).subscribe(
      () => {
        console.log("Mise à jour terminée");
        this.router.navigate(['/profil/' + this.id]);
      }
    );
  }

}
