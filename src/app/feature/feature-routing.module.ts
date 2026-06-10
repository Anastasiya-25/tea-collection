import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {TeaCollectionComponent} from "./tea-collection/tea-collection.component";
import {TeaComponent} from "./tea/tea.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'tea-collection', component: TeaCollectionComponent},
  { path: 'tea/:id', component: TeaComponent },
  {path: 'app-form', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
