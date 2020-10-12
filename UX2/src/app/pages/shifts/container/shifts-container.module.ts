import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContainerPageRoutingModule } from './shifts-container-routing.module';
import { ContainerPage } from './shifts-container.page';
import {ComponentsModule} from "../../../shared/components.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../../../services/http.interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContainerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContainerPage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class ContainerPageModule {}
