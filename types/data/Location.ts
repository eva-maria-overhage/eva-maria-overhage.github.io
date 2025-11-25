import {Reference, RemoteURL, SanityIdObject, SanityImageAsset} from "./Shared";

export type Location = {
    title: string;
    logo?: Reference<SanityImageAsset>;
    link: RemoteURL;
} & SanityIdObject;