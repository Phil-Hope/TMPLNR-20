import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {

  date = new Date();

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

}
