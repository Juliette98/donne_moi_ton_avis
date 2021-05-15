import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {Router} from "@angular/router";
import {Publication} from "../models/publication";
import {FormControl} from "@angular/forms";
import {ConnexionService} from "../connexion.service";

@Component({
  selector: 'app-creation-publication',
  templateUrl: './creation-publication.component.html',
  styleUrls: ['./creation-publication.component.scss']
})
export class CreationPublicationComponent implements OnInit {

  title: string = "";
  reference: string = "";
  description: string = "";
  price: number = 0;
  size: string = "";
  store: string = "";
  link: string = "";
  image: any;
  imageControl: FormControl = new FormControl();
  connectedUser: any;

  constructor(public publicationService : PublicationsService, public router: Router, connexionService: ConnexionService) {
    //Initialisation du formControl
    this.imageControl = new FormControl(this.image, []);
    this.connectedUser = connexionService.connectedUser;
  }

  ngOnInit(): void {
    //Récupération de l'image au chargement
    this.imageControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.image = [files];
      } else {
        this.image = files;
      }
    })
  }

  addPublication(): void{
    const publication: Publication = new Publication();
    publication.pubTitle = this.title;
    publication.pubRef = this.reference;
    publication.pubDescription = this.description;
    publication.pubPrice = this.price;
    publication.pubSize = this.size;
    publication.pubStore = this.store;
    publication.pubLink = this.link;
    publication.createdBy = this.connectedUser.id;
    publication.creatorName = this.connectedUser.fname + " " + this.connectedUser.lname;

    if (this.image)
      publication.pubImage = this.image[0].name.replace(/\s/g, '').replace(/[^a-zA-Z.\s]/g, "").toLowerCase();
    else
      publication.pubImage = "default.jpeg";
    this.publicationService.addPublication(publication, this.image).subscribe(
      () => {
        console.log("Creation ok");
        this.router.navigate(["/accueil"]);
      },
      (error :any ) => {
        console.log('error', error);
      }
    )
  }

}
