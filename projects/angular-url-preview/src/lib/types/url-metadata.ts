export class URLMetadata {
  hostname!: string;
  title!: string | null | undefined;
  description!: string | null | undefined;
  image!: string | null | undefined;
  siteName!: string;
  url!: string;

  constructor(metadata: URLMetadata) {
    Object.assign(this, metadata);
  }
};
