import {Media} from "../../../types/data/Media.ts";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";

export interface MediaVideoProps {
    videoMedia: Media,
    className?: string;
}

const MediaVideo = (
    {
        videoMedia,
        className
    }: MediaVideoProps
) => {
    const [error, setError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleError: React.ReactEventHandler<HTMLVideoElement> = (event) => {
        console.log("Video load failed", event);
        setError(true);
    }

    const handleLoad: React.ReactEventHandler<HTMLVideoElement> = (event) => {
        console.log("Video loaded successfully", event);
        setLoaded(true);
    }

    const shouldHide = () => {
        return (error || !loaded);
    };


    return (
        <video draggable={false}
               aria-label={videoMedia.description ?? ""}
               className={cn("object-cover", "transition-opacity", className ?? "")}
               onLoadedData={handleLoad} onError={handleError} src={videoMedia.url}
               controls={false}
               muted={true}
               loop={true}
               autoPlay={true}
               style={{opacity: shouldHide() ? 0 : 1}}
        />
    )
}

export default MediaVideo;