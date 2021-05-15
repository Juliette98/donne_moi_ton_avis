import {Component, Input, OnInit, Output} from '@angular/core';
import {Publication} from "../models/publication";
import {EventEmitter} from "@angular/core";
import {ConnexionService} from "../connexion.service";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-publication-block',
  templateUrl: './publication-block.component.html',
  styleUrls: ['./publication-block.component.scss']
})
export class PublicationBlockComponent implements OnInit {
  isAuthor = false;
  connectedUser : any;
  @Input()
  publication!: Publication;
  @Output() deletePublication = new EventEmitter<Publication>();
  @Output() editPublication = new EventEmitter<Publication>();
  constructor(connexionService: ConnexionService) {
    this.connectedUser = connexionService.connectedUser;

  }

  ngOnInit(): void {
    if (this.connectedUser.id === this.publication.createdBy)
      this.isAuthor = true;
  }

  deletePublicationEvent(): void{
    this.deletePublication.emit(this.publication);
  }

  editPublicationEvent(): void{
    this.editPublication.emit(this.publication);
  }


}


