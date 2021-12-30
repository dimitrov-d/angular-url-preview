export class URLPreviewConfig {
    /**
     * Specify whether the image should be shown in the card. Default is true
     */
    displayImage?: boolean;
    /**
     * Source of the image used in the cards.
     */
    customImageSrc?: string;
    /**
     * Specifies whether the footer should be styled. Default is false
     */
    styledFooter?: boolean;
    /**
     * Height of the card.
     */
    height?: string | number;
    /**
     * Width of the card.
     */
    width?: string | number;
    /**
     * Height of the image in the card.
     */
    imageHeight?: string | number;
};
