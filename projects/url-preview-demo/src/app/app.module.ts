import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularUrlPreviewModule } from 'angular-url-preview';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularUrlPreviewModule.forRoot({ width: 400 })],
  bootstrap: [AppComponent]

})
export class AppModule { }
