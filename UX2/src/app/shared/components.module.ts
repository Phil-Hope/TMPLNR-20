import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {Header} from "./header/header";
import {Footer} from "./footer/footer";
import {HeaderBannerComponent} from "./header-banner/header-banner";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [Header, Footer, HeaderBannerComponent],
  exports: [Header, Footer, HeaderBannerComponent]
})
export class ComponentsModule { }
