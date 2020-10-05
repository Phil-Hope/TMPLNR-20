import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit {

  @Input() pageTitle: any;

  logoUrl = 'https://media.publit.io/file/TMPLNR-2020.png';
  headerBanner = 'https://media.publit.io/file/header-D.png';

  constructor() { }

  ngOnInit() {}


}
