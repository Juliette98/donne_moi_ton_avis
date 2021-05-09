import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {Publication} from "../models/publication";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  publications: any;

  constructor(public publicationService: PublicationsService, public router: Router) { }

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes(): void{
    this.publicationService.getPublications().subscribe(
      (publications: any) =>{
        this.publications = publications;
      },
      () => {
        console.log('Error');
      }
    );
  }

  deletePublication(publication: Publication): void{

  }

  editPublication(publication: Publication): void{
    this.router.navigate(['/publication', publication._id]);
  }

}
