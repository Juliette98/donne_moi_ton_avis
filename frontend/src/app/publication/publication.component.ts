import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Publication} from '../models/publication';
import {PublicationsService} from "../publications.service";
import {FormControl} from "@angular/forms";
import {ConnexionService} from "../connexion.service";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  id:any;
  publication: Publication = new Publication();
  image: any;
  imageControl: FormControl = new FormControl();

  constructor(private route: ActivatedRoute, private router: Router, public publicationsService: PublicationsService, public connexionService: ConnexionService){
    //Initialisation du formControl
    this.imageControl = new FormControl(this.image, []);
  }

  ngOnInit(): void {
    //Récupération de la publication qu'on veut modifier
    this.id = this.route.snapshot.paramMap.get('id');
    this.publication = {_id: 0, pubTitle: '', pubRef: '', pubDescription: '', pubPrice: 0,
      pubSize: '', pubStore: '', pubLink: '', pubImage: '', dateCreation:''};
    this.publicationsService.getPublication(this.id).subscribe(
      (publication: Publication) => {
        this.publication = publication;

      },
      (error) => {
        console.log('Error');
      }
    );
    //Gestion des images
    //Récupération de l'image au chargement
    this.imageControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.image = [files];
      } else {
        this.image = files;
      }
    })
  }

  updatePublication(): void{
    //Si l'image a changé
    if (this.image)
      this.publication.pubImage = this.image[0].name.replace(/\s/g, '').replace(/[^a-zA-Z.\s]/g, "").toLowerCase();
    //Mise à jour de la publication
    this.publicationsService.updatePublication(this.publication, this.image).subscribe(
      () => {
        this.router.navigate(['/accueil']);
      },
      (error) => {
        console.log('Error lors de la mise à jour de la publication');
      }
    );
  }

}
