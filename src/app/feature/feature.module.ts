import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import {FormComponent} from "./form/form.component";
import {MainComponent} from "./main/main.component";
import {TeaComponent} from "./tea/tea.component";
import {TeaCollectionComponent} from "./tea-collection/tea-collection.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
   FormComponent,
   MainComponent,
   TeaComponent,
   TeaCollectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
  ],
  exports: [
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
