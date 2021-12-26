<div align="center"><img src="logo.png" width="400" height="400" style="display: block;  margin-left: auto;  margin-right: auto;  width: 50%;" /></div>

# Angular URL Preview

Angular UI card component which fetches and displays metadata from a URL (title, description, image and site name). <br>
The latest stable Angular version this package is built with is **13.0.0**


[![npm version](https://badge.fury.io/js/angular-url-preview.svg)](https://badge.fury.io/js/angular-url-preview)
![package downloads](https://img.shields.io/npm/dt/angular-url-preview)

**This package uses a [proxy server](https://github.com/Dhaiwat10/rlp-proxy) to bypass CORS restriction and mimic a request with an "Access-Control-Allow-Origin" HTTP header present. It behaves similarly to [CORS anywhere](https://cors-anywhere.herokuapp.com/) without the need for an opt-in or a URL whitelist/blacklist.
[The Open Graph Protocol](https://ogp.me/) is used to scrape the metadata and gather the underlying URL information.**

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
<ngx-url-preview  url="example.com"></ngx-url-preview>
```

Specifying the URL is mandatory and it can be in any format, such as:
 - Apex domain: example.com
 - Subdomain: www.example.com
 - With protocol included: https://example.com or https://www.example.com

