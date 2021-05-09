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

  addPublication(publication: Publication): Observable<any>{
    const imagePath = '../assets/images/uploads';
    const formData: FormData = new FormData();
    return this.http.post('http://localhost:3000/publications/', publication);
  }

  deletePublication(pubId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/publications/' + pubId);
  }

  getPublication(pubId: any): Observable<any>{
    console.log(pubId);
    return this.http.get('http://localhost:3000/publications/' + pubId);
  }

  savePublication(publication: Publication): void{
    const index = this.publications.indexOf(publication);
    this.publications.splice(index, 1);
    this.publications.push(publication);
  }

  updatePublication(publication: Publication): Observable<any>{
    return this.http.put('http://localhost:3000/publications/' + publication._id, publication);
  }
}
