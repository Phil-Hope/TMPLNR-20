import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: any;

  logoUrl = 'https://media.publit.io/file/TMPLNR-2020.png';
  headerBanner = 'https://media.publit.io/file/header-D.png';

  constructor() { }

  ngOnInit() {}


}
