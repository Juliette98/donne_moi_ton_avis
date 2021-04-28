import { Injectable } from '@angular/core';
import {Publication} from "./models/publication";

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  pubTitle = '';
  pubDescription = '';

  publications: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addPublication(){
    const publication: Publication = new Publication();
    publication.id = Math.random(),
      publication.pubTitle = this.pubTitle,
      publication.pubDescription = this.pubDescription,

      this.pubTitle = '';
    this.pubDescription = '';


    this.publications.push(publication);
  }

  deletePublication(publication:any):void{
    var index = this.publications.indexOf(publication);
    this.publications.splice(index,1);
  }

  getPublication(pubId:number):Publication{
    for(let i=0; i<this.publications.length; i++){
      var publication = this.publications[i];
      if(publication.id == pubId){
        return publication;
      }
    }
    return null as any;
  }

  savePublication(publication:Publication):void{
    var index = this.publications.indexOf(publication);
    this.publications.splice(index,1);
    this.publications.push(publication);
  }



}
