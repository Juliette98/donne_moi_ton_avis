import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  publications: any;

  constructor(public publicationService: PublicationsService) { }

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

}
