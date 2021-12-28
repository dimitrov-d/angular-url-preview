<div align="center"><img src="https://lh3.googleusercontent.com/OdQTZV9_knDmMGcjMYOc1zh1s8UZkCsZKl2s3jTIZHN2WB5vCDVj751eancGiuka4NDSJJl_X6r6aCjL4RODLZdJ0lW5lFHvLNGMGtp5WNaU_C6IZXNLmk8XyhiKPOF9Fa4dShMZMPjzkxeYQeK32iT3z6nUYW2vSOPL7ROUbrWCxvTCTMvf-qjLKgv7fYaqJ6j2JEvKQxSgkZhdY8q6qvxYHrDJGwmwF41xG7oBO1biohtPmwLsiOftJdDtsqXeNBi-cHzsgmZbygilGTYfcb9pPUNwO3BmtFkbEHtU2iHnOUJ4jxQ43nJFIhIDkO7py4ZhyEsIYkFoJjGeaN-Ge3cwiRnH5w-n0x4gbQzLW_m6Thje7w2YmokRMGNlN2tgSGZ_19sZYZ6nQjObDa95ovBqsUyiDpWddwLgUpuHUfCtZ7hVRx1aiXwNWgXA7U7FYc_6U7yHphYpeANkyU5h57ugNS670K46mAKAfOb8nCOUzrCyCYZaEnORU6P4cUGb6WDaxgp9rD1ocAsGIz_SzXegLgJvcQZgWT1gliln4x-7jdFFOzMWmURNDYueuT-V9PGVURGz7xBqFm2Ad7xiMRHqxEu6BEg4o2OwykCecO9XB-JumnFvvjzVGwQAJ9mam_2J5LHaU9I3JW0KFsCn8EYSymaQ_V2Rodtyv-ANrqiSDCOSbRalLk91-xmAZIQGq-tRJm6jZL5ABaIjMYSwtyA=w814-h702-no?authuser=0"  width="400"  height="400" style="display: block; margin-left: auto; margin-right: auto; width: 50%;"/></div>

# Angular URL Preview

Angular UI card component which fetches and displays metadata from a URL (title, description, image and site name). <br>

The latest stable Angular version this package is built with is **13.0.0**

[![npm version](https://badge.fury.io/js/angular-url-preview.svg)](https://badge.fury.io/js/angular-url-preview) ![package downloads](https://img.shields.io/npm/dt/angular-url-preview)

**This package uses a [proxy server](https://github.com/Dhaiwat10/rlp-proxy) to bypass CORS restriction and mimic a request with an "Access-Control-Allow-Origin" HTTP header present. It behaves similarly to [CORS anywhere](https://cors-anywhere.herokuapp.com/) without the need for an opt-in or a URL whitelist/blacklist.**

**[The Open Graph Protocol](https://ogp.me/) is used to scrape the metadata and gather the underlying URL information.**

**The proxy server also uses [Supabase](https://supabase.com/) for caching the request responses to achieve instant subsequent metadata loading and [Redis](https://redis.io/) to create a request limiter in order to prevent server overloading.**

## Installation
`npm install angular-url-preview`

In app.module.ts:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularUrlPreviewModule } from 'angular-url-preview';

@NgModule({
declarations: [AppComponent],
imports: [BrowserModule, AngularUrlPreviewModule],
bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

In the component's template:
```html
<ngx-url-preview url="example.com"></ngx-url-preview>
```
Specifying the URL is mandatory and it can be in any format, such as:
- Apex domain: example.com
- Subdomain: www.example.com
- With protocol included: https://example.com or https://www.example.com

## Troubleshooting
It is possible that an error occurs while attempting to scrape the metadata from a website. It's important to note that an error most usually occurs if the target resource is not found or it does not provide the adequate metadata to its client. To check if an error has occurred it's a good idea to take a look at the developer console of your browser.

### 404 Not found
If this error occurs then firstly verify that the URL you have supplied is accurate and that the webpage it points to exists. If it does and the error persists, then the webpage most likely contains anti-bot protection and does not allow metadata scraping through a proxy server.

### Image not loaded
Some websites provide a relative source which points to their banner image in their metadata. This is wrong as it is consequently unable to be found from a different host. Note that this mistake is corrected by angular-url-preview.

If for a different reason the image is not loaded, it is not provided, the resource is forbidden, or it is unsuitable, you may supply a custom image source (either relative or absolute) to the library, which will display the custom image by priority.

Example:
```html
<ngx-url-preview url="example.com" customImageSrc="https://custom.com/logo.png"></ngx-url-preview>
```
**Important:** If you are using a relative path for the custom image source, make sure the image is located in the assets folder of your application (most usually src/assets).

Afterwards, you need to specify the assets in angular.json:
```json
...
"architect": {
	"build": {
		"options": {
			...
			"assets": [
				...
				"src/assets"
			],
			...
```
And then in the component's template:
```html
<ngx-url-preview url="example.com" customImageSrc="/assets/source.jpg"></ngx-url-preview>
```

### Other metadata missing
You should note that this is completely up to the webpage, which has missing or unspecified metadata which was not able to be gathered through the open graph protocol. There are as many defaults and fallbacks as possible handled by angular-url-preview itself.

### Slow metadata loading
It is possible that the loading of a website metadata is slow. Note that this will most likely occur only on the first load of the page. Afterwards, a [Supabase](https://supabase.com/) cache is used to cache the metadata, which will in turn quickly load the metadata on subsequent requests.