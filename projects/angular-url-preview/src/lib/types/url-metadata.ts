export class URLMetadata {
    hostname!: string;
    title!: string;
    description!: string;
    image!: string;
    siteName!: string;
    url!: string;

    constructor(metadata: URLMetadata) {
        Object.assign(this, metadata);
    }
};