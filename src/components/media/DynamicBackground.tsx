import MediaImage from "./MediaImage.tsx";
import MediaVideo from "@/components/media/MediaVideo.tsx";
import {ResolvedBackground} from "@/routes/Home.tsx";

export interface DynamicBackgroundProps {
    background: ResolvedBackground;
    className?: string;
}

const DynamicBackground = (
    {
        background,
        className
    }: DynamicBackgroundProps
) => {
    switch (background.mediaType) {
        case "image":
            return <MediaImage imageMedia={background.image} className={className}/>
        case "video":
            return <MediaVideo videoMedia={background.video} className={className}/>
        default:
            console.warn("Unsupported Background Media type", background)
            return null;
    }
}

export default DynamicBackground;