import {Reference, SanityIdObject, SanityImageAsset} from "./Shared.ts";

export type Tag = {
    title: string;
    icon: Reference<SanityImageAsset>
    description?: string;
} & SanityIdObject;