import { URLPreviewConfig } from './types/angular-url-preview.config';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularUrlPreviewComponent } from './angular-url-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AngularUrlPreviewComponent],
  imports: [BrowserModule, HttpClientModule],
  exports: [AngularUrlPreviewComponent]
})
export class AngularUrlPreviewModule {
  static forRoot(config: URLPreviewConfig): ModuleWithProviders<AngularUrlPreviewModule> {
    return {
      ngModule: AngularUrlPreviewModule,
      providers: [
        { provide: URLPreviewConfig, useValue: config }
      ]
    };
  }
}
