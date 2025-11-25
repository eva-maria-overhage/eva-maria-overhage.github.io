import {ISO8601Date, Reference, SanityIdObject, SanityImageAsset} from "./Shared";
import {Tag} from "./Tag.ts";

type BaseArtwork = {
    title: string;
    media: Reference<SanityImageAsset>[];
    publish_date: ISO8601Date;
    size?: {
        height: number;
        width: number;
        depth?: number;
    };
    tags: Reference<Tag>[];
}

type ArtworkWithDescription = {
    hasDescription: true;
    description: string;
} & BaseArtwork;

type ArtworkWithoutDescription = {
    hasDescription: false;
} & BaseArtwork;

export type Artwork = (ArtworkWithDescription | ArtworkWithoutDescription) & SanityIdObject;