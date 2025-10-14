import {ID, ISO8601Date} from "./Shared";
import {Media} from "./Media";
import {Tag} from "./Tag";

export interface Artwork {
    mediaIds: ID<Media>[];
    heroMediaId?: ID<Media>;
    title: string;
    description: string;
    year: ISO8601Date;
    size?: {
        height: number;
        width: number;
        depth?: number;
        unit: 'cm' | 'm' | 'mm' | 'in' | 'ft';
    }
    materials?: string[];
    technique?: string;
    tags?: ID<Tag>[];
}