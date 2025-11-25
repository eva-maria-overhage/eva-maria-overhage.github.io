import {Reference, SanityFileAsset, SanityImageAsset} from "./Shared";

export type LandingPage = {
    background: Background
}

export type VideoBackground = {
    mediaType: "video",
    video: Reference<SanityFileAsset>
}

export type ImageBackground = {
    mediaType: "image",
    image: Reference<SanityImageAsset>
}

export type Background = VideoBackground | ImageBackground