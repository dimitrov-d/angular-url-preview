import { NgModule } from '@angular/core';
import { AngularUrlPreviewComponent } from './angular-url-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AngularUrlPreviewComponent],
  imports: [BrowserModule, HttpClientModule],
  exports: [AngularUrlPreviewComponent]
})
export class AngularUrlPreviewModule { }
