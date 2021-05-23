import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ConnexionService} from "../connexion.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  gender: any;
  fname: any;
  lname: any;
  email: any;
  birthday: any;

  constructor(private route: ActivatedRoute, public connexionService: ConnexionService) { }

  ngOnInit(): void {
    this.profil();
  }

  profil(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.connexionService.profil(id).subscribe(
      (user: any) =>{
        this.gender = user.gender;
        this.fname = user.fname;
        this.lname = user.lname;
        this.email = user.login;
        this.birthday = user.birthday;
      }
    );
  }
}
