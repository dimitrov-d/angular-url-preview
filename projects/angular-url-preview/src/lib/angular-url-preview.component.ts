import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { URLPreviewConfig } from './types/angular-url-preview.config';
import { URLMetadata } from './types/url-metadata';

@Component({
  selector: 'ngx-url-preview',
  templateUrl: './angular-url-preview.component.html',
  styleUrls: ['./angular-url-preview.component.scss']
})
export class AngularUrlPreviewComponent implements OnInit {
  @Input() url!: string;

  @Input() customImageSrc?: string;
  @Input() styledFooter = false;
  @Input() displayImage = true;

  @Input() height?: string | number
  @Input() width?: string | number;
  @Input() imageHeight?: string | number;

  proxyUrl = 'https://cors-proxy.xyz/fetch';
  metadata!: URLMetadata;

  constructor(@Optional() config: URLPreviewConfig, private http: HttpClient) {
    this.assignConfiguration(config);
  }

  ngOnInit() {
    if (!this.validateUrl()) return;

    this.url = `https://${this.url.replace('http://', '')}`;
    this.http.get(`${this.proxyUrl}/${this.url}`, { responseType: 'text' })
      .pipe(catchError(error => (error.status === 404)
        ? throwError(() => `URL not found: ${this.url}`)
        : throwError(() => `Error fetching URL metadata for ${this.url}: ${error.message}`)
      ))
      .subscribe((data) => {
        const tempEl = document.createElement('temp');
        tempEl.innerHTML = data;
        const url = new URL(this.url);
        this.metadata = new URLMetadata({
          hostname: url.hostname,
          siteName: url.hostname.split('.').splice(-2)[0],
          title: this.parseMetaProperty(tempEl, 'title'),
          description: this.parseMetaProperty(tempEl, 'description'),
          image: this.parseMetaProperty(tempEl, 'image'),
          url: this.url,
        });
        // Assign capitalized site name to metadata if it is not set
        this.metadata.siteName = this.metadata.siteName?.[0].toUpperCase() + this.metadata.siteName?.substring(1).toLowerCase();
        // Relative asset URL
        if (this.metadata.image?.startsWith('/') && !this.customImageSrc)
          this.metadata.image = this.metadata.url + this.metadata.image;

        this.metadata.image = this.customImageSrc || this.metadata.image;
      });

    this.adjustInputs();
  }

  validateUrl(): boolean {
    if (!this.url) throw Error('URL is required!');
    const urlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (!urlRegex.test(this.url)) throw Error(`Invalid URL: ${this.url}`);

    return true;
  }

  private parseMetaProperty(el: HTMLElement, attribute: 'image' | 'title' | 'description'): string | null | undefined {
    return el.querySelector(`meta[property="og:${attribute}"]`)?.getAttribute('content');
  }

  navigateToUrl(): Window {
    return window.open(this.metadata.url, '_blank') as Window;
  }

  private assignConfiguration(config: URLPreviewConfig): void {
    if (!config) return;
    Object.assign(this, config as Partial<AngularUrlPreviewComponent>);
  }

  private adjustInputs(): void {
    (['height', 'width', 'imageHeight'] as const).forEach(
      (field: keyof AngularUrlPreviewComponent) => (this[field] as string) = `${parseInt((this[field] as string))}px`
    );
  }

}
