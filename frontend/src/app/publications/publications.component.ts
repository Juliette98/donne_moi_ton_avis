import { Component, OnInit } from '@angular/core';
import {Publication} from '../models/publication';
import {PublicationsService} from "../publications.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  constructor(public publicationsService: PublicationsService) { }

  ngOnInit(): void {
  }
}
