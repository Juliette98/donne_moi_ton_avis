import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PublicationComponent } from './publication/publication.component';
import { CreationPublicationComponent } from './creation-publication/creation-publication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule} from "@angular/material/grid-list";
import { HttpClientModule } from "@angular/common/http";
import { PublicationBlockComponent } from './publication-block/publication-block.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { MatSliderModule } from "@angular/material/slider";
import { MatExpansionModule } from "@angular/material/expansion";
import { ProfilComponent } from './profil/profil.component';
import { MesPublicationsComponent } from './mes-publications/mes-publications.component';
import { ModificationProfileComponent } from './modification-profile/modification-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    ConnexionComponent,
    InscriptionComponent,
    PublicationComponent,
    CreationPublicationComponent,
    PublicationBlockComponent,
    ProfilComponent,
    MesPublicationsComponent,
    ModificationProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    HttpClientModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatSliderModule,
    MatExpansionModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
