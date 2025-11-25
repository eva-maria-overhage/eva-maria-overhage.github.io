import {ISO8601Date, Reference, SanityIdObject, SanityImageAsset} from "./Shared";
import {Tag} from "./Tag.ts";

type ArtworkWithDescription = {
    title: string;
    hasDescription: true;
    description: string;
    media: Reference<SanityImageAsset>;
    publish_date: ISO8601Date;
    size?: {
        height: number;
        width: number;
        depth?: number;
    };
    tags: Reference<Tag>;
};

type ArtworkWithoutDescription = {
    title: string;
    hasDescription: false;
    description?: never;
    media: Reference<SanityImageAsset>;
    publish_date: ISO8601Date;
    size?: {
        height: number;
        width: number;
        depth?: number;
    };
    tags: Reference<Tag>;
};

export type Artwork = (ArtworkWithDescription | ArtworkWithoutDescription) & SanityIdObject;