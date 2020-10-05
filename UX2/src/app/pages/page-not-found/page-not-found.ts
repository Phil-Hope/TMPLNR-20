import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.html',
  styleUrls: ['./page-not-found.scss'],
})
export class PageNotFoundPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  returnHome() {
    this.router.navigateByUrl('/home');
  }
}
