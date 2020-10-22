import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from '@ionic/angular';
import {EditPageRoutingModule} from './edit-routing.module';
import {EditPage} from './edit.page';
import {StoreModule} from "@ngrx/store";
import {ComponentsModule} from "../../../../shared/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPageRoutingModule,
        StoreModule.forFeature('shifts', {}),
        ReactiveFormsModule,
        ComponentsModule
    ],
  declarations: [EditPage]
})
export class EditPageModule {
}
