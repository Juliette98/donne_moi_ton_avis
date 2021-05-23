import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mes-publications',
  templateUrl: './mes-publications.component.html',
  styleUrls: ['./mes-publications.component.scss']
})
export class MesPublicationsComponent implements OnInit {
  publications: any;
  noResult = false;

  constructor(private route: ActivatedRoute, public publicationService: PublicationsService) { }

  ngOnInit(): void {
    // Récupère la liste de toutes les publicactions
    this.getMyPublications();
  }

  getMyPublications(): void{
    let id = this.route.snapshot.paramMap.get('id');
    this.publicationService.getMyPublications(id).subscribe(
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
