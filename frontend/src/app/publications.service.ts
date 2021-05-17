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
    if (image) {
      const formData = new FormData();
      formData.append('image', image[0], image[0].name);
      //Enregistre d'abord l'image
      this.uploadImage(formData).subscribe(
        () => {
          console.log("upload ok");
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    }
    return this.http.post('http://localhost:3000/publication',  publication);
  }

  uploadImage(formData: FormData): Observable<any>{
    return this.http.post('http://localhost:3000/upload', formData);
  }

  deletePublication(pubId: any): Observable<any>{
    return this.http.delete('http://localhost:3000/publication/' + pubId);
  }

  getPublication(pubId: any): Observable<any>{
    return this.http.get('http://localhost:3000/publication/' + pubId);
  }

  updatePublication(publication: Publication, image: any): Observable<any>{
    if (image) {
      const formData = new FormData();
      formData.append('image', image[0], image[0].name);
      //Enregistre d'abord l'image
      this.uploadImage(formData).subscribe(
        () => {
          console.log("upload ok");
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    }
    return this.http.put('http://localhost:3000/publication/' + publication._id, publication);
  }

  filtrer(prixMax: number, boutique: string, motCle:string): Observable<any>{
    console.log("vfdvdf");
    return this.http.post('http://localhost:3000/filtre', {prixMax: prixMax, boutique: boutique, motCle: motCle});
  }
}
