import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoPath: any;

  constructor() { }

  ngOnInit(): void {
    this.logoPath = "../../assets/images/util/logo.png";
  }

}
