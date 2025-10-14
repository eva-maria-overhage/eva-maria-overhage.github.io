import {useState} from "react";
import styles from "./MediaImage.module.css";
import {applyMultipleClasses} from "../../../Utils.ts";
import {Media} from "../../../types/data/Media.ts";

export interface MediaImageProps {
    imageMedia: Media;
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
             aria-label={imageMedia.description ?? ""}
             className={applyMultipleClasses(styles.image, className ?? "", shouldHide() ? styles.hidden : "")}
             onLoad={handleLoad} onError={handleError} src={imageMedia.url}
        />
    )
}

export default MediaImage;