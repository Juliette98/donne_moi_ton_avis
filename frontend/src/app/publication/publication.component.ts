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

  id: number = 0;
  publication: Publication = {id:0, pubTitle:"", pubDescription:""};



  constructor(private route: ActivatedRoute, private router: Router, public publicationsService: PublicationsService){
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.publication = this.publicationsService.getPublication(this.id);

  }

  savePublication():void{
    this.publicationsService.savePublication(this.publication);
    this.router.navigate(["/publications"])
  }

}
