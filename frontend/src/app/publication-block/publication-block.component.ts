import {Component, Input, OnInit, Output} from '@angular/core';
import {Publication} from "../models/publication";
import {EventEmitter} from "@angular/core";
import {PublicationsService} from "../publications.service";

@Component({
  selector: 'app-publication-block',
  templateUrl: './publication-block.component.html',
  styleUrls: ['./publication-block.component.scss']
})
export class PublicationBlockComponent implements OnInit {

  pubStatus = 'view';
  @Input()
  publication!: Publication;
  @Output() deletePublication = new EventEmitter<Publication>();
  @Output() editPublication = new EventEmitter<Publication>();
  constructor(public publicationsService: PublicationsService) { }

  ngOnInit(): void {
  }

  deletePublicationEvent(): void{
    this.deletePublication.emit(this.publication);
  }

  editPublicationEvent(): void{
    this.editPublication.emit(this.publication);
  }

  updatePublication(): void{
    this.pubStatus = 'loading';
    this.publicationsService.updatePublication(this.publication).subscribe(
      (publication: Publication) => {
        this.pubStatus = 'view';
      },
      (error) => {
        this.pubStatus = 'error';
        console.log('Publication update error');
      }
    );
  }
}
