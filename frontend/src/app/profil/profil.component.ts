import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConnexionService} from "../connexion.service";
import {InscriptionService} from "../inscription.service";
import {MatDialog} from "@angular/material/dialog";
import {ModificationProfileComponent} from "../modification-profile/modification-profile.component";

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

  constructor(private route: ActivatedRoute, public connexionService: ConnexionService, public inscriptionService: InscriptionService, public router: Router, public dialog: MatDialog) { }

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
        this.birthday = user.birthday.substr(0,10);
      }
    );
  }

  delete(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.inscriptionService.deleteAccount(id).subscribe(
      () => {
        console.log("L'utilisateur a été supprimé avec succès");
        this.router.navigate(['/connexion']);
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModificationProfileComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
