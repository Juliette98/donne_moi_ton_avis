import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Publication} from "../models/publication";

@Component({
  selector: 'app-mes-publications',
  templateUrl: './mes-publications.component.html',
  styleUrls: ['./mes-publications.component.scss']
})
export class MesPublicationsComponent implements OnInit {
  publications: any;
  noResult = false;

  constructor(private route: ActivatedRoute, public publicationService: PublicationsService, public router: Router) { }

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
}
