import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { URLMetadata } from './types/url-metadata';

@Component({
  selector: 'ngx-url-preview',
  templateUrl: './angular-url-preview.component.html',
  styleUrls: ['./angular-url-preview.component.scss']
})
export class AngularUrlPreviewComponent implements OnInit {
  @Input() url!: string;
  metadata!: URLMetadata;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.validateUrl()) return;

    type metadataResult = { metadata: URLMetadata };

    this.http.get(`https://rlp-proxy.herokuapp.com/v2?url=${this.url}`)
      .pipe(catchError(error => {
        if (error.status === 404) return throwError(() => `URL not found: ${this.url}`);
        else return throwError(() => `Error fetching URL metadata for ${this.url}`);;
      }))
      .subscribe(result => {
        const data = result as metadataResult;
        this.metadata = new URLMetadata(data.metadata);
        // Get the second-to-last segment of the host name
        const siteName = this.metadata.hostname.split('.').splice(-2)[0];
        // Assign capitalized site name to metadata if it is not set
        this.metadata.siteName ||= siteName[0].toUpperCase() + siteName.substring(1).toLowerCase();
      });
  }

  validateUrl(): boolean {
    if (!this.url) throw Error('URL is required!');
    const urlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (!urlRegex.test(this.url)) throw Error(`Invalid URL: ${this.url}`);

    return true;
  }

  navigateToUrl(): Window {
    return window.open(this.metadata.url, '_blank') as Window;
  }

}
