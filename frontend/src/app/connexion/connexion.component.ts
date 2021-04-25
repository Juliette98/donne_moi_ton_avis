import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  logoPath: any;

  constructor() { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

}
