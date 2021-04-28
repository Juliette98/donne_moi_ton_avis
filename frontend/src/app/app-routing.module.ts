import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {CreationPublicationComponent} from "./creation-publication/creation-publication.component";
import {PublicationComponent} from "./publication/publication.component";
import {PublicationsComponent} from "./publications/publications.component";

const routes: Routes = [
  {path: '', component:AccueilComponent},
  {path: 'accueil', component:AccueilComponent},
  {path: 'connexion', component:ConnexionComponent},
  {path: 'inscription', component:InscriptionComponent},
  {path: 'creation', component:CreationPublicationComponent},
  {path: 'publications', component: PublicationsComponent},
  {path: 'publication/:id', component: PublicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
