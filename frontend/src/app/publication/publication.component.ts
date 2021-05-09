import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Publication} from '../models/publication';
import {PublicationsService} from "../publications.service";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  id:any;
  publication: Publication = new Publication();

  constructor(private route: ActivatedRoute, private router: Router, public publicationsService: PublicationsService){
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.publication = {_id: 0, pubTitle: '', pubRef: '', pubDescription: '', pubPrice: 0,
      pubSize: '', pubStore: '', pubLink: '', pubImage: ''};
    console.log('"id from comp' + this.id);
    this.publicationsService.getPublication(this.id).subscribe(
      (publication: Publication) => {
        this.publication = publication;

      },
      (error) => {
        console.log('Error');
      }
    );
  }

  /*savePublication(): void{
    this.publicationsService.savePublication(this.publication);
    this.router.navigate(['/notes']);
  }*/

  updatePublication(): void{
    this.publicationsService.updatePublication(this.publication).subscribe(
      () => {
        this.router.navigate(['/accueil']);
      },
      (error) => {
        console.log('Error lors de la mise à jour de la publication');
      }
    );
  }

}
