import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../connexion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoPath: any;

  constructor(public connexionService: ConnexionService, public router: Router) { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

  logout(): void{
    this.connexionService.logout().subscribe(
      () => {
        this.router.navigate(['/connexion'])
      },
      (error) => {
      }
    );
  }

}
