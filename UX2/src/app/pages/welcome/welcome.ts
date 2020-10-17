import {Component, ViewChild, OnInit} from "@angular/core";
import {MenuController, IonSlides} from '@ionic/angular';
import {Router} from '@angular/router';
import { WELCOME_KEY } from "../../guards/welcome.guard";
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;



@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})

export class WelcomePage implements OnInit {
  showSkip = true;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
  ) {
  }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Storage.set({key: WELCOME_KEY, value: 'true'});
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
