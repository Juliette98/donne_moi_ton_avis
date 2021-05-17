import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {Publication} from "../models/publication";
import {Router} from "@angular/router";
import {ConnexionService} from "../connexion.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  publications: any;
  prixMax: any;
  boutique: any;
  motCle: any;
  noResult = false;

  constructor(public publicationService: PublicationsService, public connexionService: ConnexionService ,public router: Router) { }

  ngOnInit(): void {
    let connectedUser = this.connexionService.connectedUser;
    console.log(connectedUser);
   // if (connectedUser===null) this.router.navigate(['/connexion']);
    this.getNotes();
  }

  getNotes(): void{
    this.publicationService.getPublications().subscribe(
      (publications: any) =>{
        this.publications = publications;
        //Pour avoir les nouvelles publications en premier
        this.publications.reverse();
        this.noResult = this.publications.length === 0;
      },
      () => {
        console.log('Error');
      }
    );
  }

  deletePublication(publication: Publication): void{
    this.publicationService.deletePublication(publication._id).subscribe(
      () => {
        const index = this.publications.indexOf(publication);
        this.publications.splice(index, 1);
      },
      () => {
        console.log('Erreur lors de la suppression');
      }
    )
  }

  editPublication(publication: Publication): void{
    this.router.navigate(['/publication', publication._id]);
  }

  filtrer(): void{
    console.log(this.prixMax);
    console.log(this.boutique);
    console.log(this.motCle);
    this.publicationService.filtrer(this.prixMax, this.boutique, this.motCle).subscribe(
      (publications: any) =>{
        this.publications = publications;
        //Pour avoir les nouvelles publications en premier
        this.publications.reverse();
        this.noResult = this.publications.length === 0;
      },
      () => {
        console.log('Error');
      }
    );
  }

}
