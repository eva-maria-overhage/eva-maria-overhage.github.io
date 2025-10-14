import {ID, RemoteURL} from "./Shared";
import {Media} from "./Media";

export interface Employer {
    name: string;
    logoId?: ID<Media>;
    website?: RemoteURL;
    brandColor?: string;
    brandColor2?: string;
}