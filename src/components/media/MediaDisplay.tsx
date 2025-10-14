import {Media, MediaType} from "../../../types/data/Media.ts";
import MediaImage from "./MediaImage.tsx";
import {ID} from "../../../types/data/Shared.ts";
import medias from "@/data/Medias.json";
import MediaVideo from "@/components/media/MediaVideo.tsx";

export interface MediaDisplayProps {
    mediaId: ID<Media>
    className?: string;
}

const typedMedia = medias as Record<ID<Media>, Media>

const MediaDisplay = (
    {
        mediaId,
        className
    }: MediaDisplayProps
) => {
    const media = typedMedia[mediaId];

    if (media === undefined) {
        console.error("MediaId not found: ", mediaId);
        return <></>;
    }



    if (media?.type === undefined) return <></>;
    switch (media.type) {
        case MediaType.IMAGE:
            return <MediaImage imageMedia={media} className={className}/>;
        default:
            return <MediaVideo videoMedia={media} className={className}/>;
    }
}

export default MediaDisplay;