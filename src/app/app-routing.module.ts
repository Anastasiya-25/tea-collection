import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {TeaCollectionComponent} from "./components/tea-collection/tea-collection.component";
import {FormComponent} from "./components/form/form.component";
import {TeaComponent} from "./components/tea/tea.component";

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'tea-collection', component: TeaCollectionComponent},
  { path: 'tea/:id', component: TeaComponent },
  {path: 'app-form', component: FormComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
