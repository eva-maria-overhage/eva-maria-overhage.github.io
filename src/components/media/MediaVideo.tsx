import {useState} from "react";
import {cn} from "@/lib/utils.ts";

export interface MediaVideoProps {
    videoMedia: string,
    className?: string;
}

const MediaVideo = (
    {
        videoMedia,
        className
    }: MediaVideoProps
) => {
    const [error, setError] = useState<boolean>(false);

    const handleError: React.ReactEventHandler<HTMLVideoElement> = (event) => {
        console.log("Video load failed", event);
        setError(true);
    }


    const shouldHide = () => {
        return error;
    };


    return (
        <video draggable={false}
               className={cn("object-cover", "transition-opacity", className ?? "")}
               onError={handleError} src={videoMedia}
               controls={false}
               muted={true}
               loop={true}
               autoPlay={true}
               style={{opacity: shouldHide() ? 0 : 1}}
        />
    )
}

export default MediaVideo;