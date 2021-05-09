import { Injectable } from '@angular/core';
import {Publication} from "./models/publication";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  publications: Array<Publication> = new Array<Publication>();
  constructor(private http: HttpClient) { }

  getPublications(): any{
    return this.http.get('http://localhost:3000/publications');
  }

  addPublication(publication: Publication, image: any): Observable<any>{
    const formData = new FormData();
    formData.append('image', image, image.name);
    //Enregistre d'abor l'image
    this.http.post('http://localhost:3000/upload', formData)
    return this.http.post('http://localhost:3000/publication',  publication);
  }

  deletePublication(pubId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/publication/' + pubId);
  }

  getPublication(pubId: any): Observable<any>{
    return this.http.get('http://localhost:3000/publication/' + pubId);
  }

  updatePublication(publication: Publication ): Observable<any>{
    return this.http.put('http://localhost:3000/publication/' + publication._id, publication);
  }
}
