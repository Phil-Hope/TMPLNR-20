import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {Header} from "./header/header";
import {Footer} from "./footer/footer";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [Header, Footer],
  exports: [Header, Footer]
})
export class ComponentsModule { }
