import {useState} from "react";
import styles from "./MediaImage.module.css";
import {cn} from "@/lib/utils.ts";

export interface MediaImageProps {
    imageMedia: string;
    className?: string;
}

const MediaImage = (
    {
        imageMedia,
        className
    }: MediaImageProps) => {

    const [error, setError] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
        console.log("Image load failed", event);
        setError(true);
    }

    const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
        console.log("Image loaded successfully", event);
        setLoaded(true);
    }

    const shouldHide = () => {
        return (error || !loaded);
    };

    return (
        <img draggable={false}
             alt={""}
             className={cn(styles.image, className ?? "", shouldHide() ? styles.hidden : "")}
             onLoad={handleLoad} onError={handleError} src={imageMedia}
        />
    )
}

export default MediaImage;