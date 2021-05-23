import {Component, Input, OnInit, Output} from '@angular/core';
import {Publication} from "../models/publication";
import {EventEmitter} from "@angular/core";
import {ConnexionService} from "../connexion.service";

@Component({
  selector: 'app-publication-block',
  templateUrl: './publication-block.component.html',
  styleUrls: ['./publication-block.component.scss']
})
export class PublicationBlockComponent implements OnInit {
  isAuthor = false;
  connectedUser : any;
  date?: string;
  @Input()
  publication!: Publication;
  @Output() deletePublication = new EventEmitter<Publication>();
  @Output() editPublication = new EventEmitter<Publication>();
  constructor(public connexionService: ConnexionService) {
    this.connectedUser = connexionService.connectedUser;
  }

  ngOnInit(): void {
    if (this.connectedUser.id === this.publication.createdBy)
      this.isAuthor = true;
    const date = new Date(this.publication.dateCreation);
    this.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " à " + date.getHours() + ":" + date.getMinutes();

  }

  deletePublicationEvent(): void{
    this.deletePublication.emit(this.publication);
  }

  editPublicationEvent(): void{
    this.editPublication.emit(this.publication);
  }

}


