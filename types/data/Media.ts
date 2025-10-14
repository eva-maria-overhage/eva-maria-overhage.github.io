import {LocalURL} from "./Shared";

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO"
}

export interface Media {
    type: MediaType;
    url: LocalURL;
    description?: string;
}