import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TeaCollectionComponent } from './components/tea-collection/tea-collection.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TeaComponent } from './components/tea/tea.component';
import {HttpClientModule} from "@angular/common/http";
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TeaCollectionComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    TeaComponent,
    TextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
