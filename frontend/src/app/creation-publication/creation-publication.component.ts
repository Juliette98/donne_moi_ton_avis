import { Component, OnInit } from '@angular/core';
import {PublicationsService} from "../publications.service";
import {Router} from "@angular/router";
import {Publication} from "../models/publication";

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
  image: File | null | undefined;

  constructor(public publicationService : PublicationsService, public router: Router) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.image = files.item(0);
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
    publication.pubImage = this.image;
    this.publicationService.addPublication(publication).subscribe(
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
