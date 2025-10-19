import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {Artwork} from "../../../../types/data/Artwork.ts";
import {ID} from "../../../../types/data/Shared.ts";
import {Media} from "../../../../types/data/Media.ts";

export interface SingleArtworkContent {
    artwork: Artwork,
    mediaProvider: Record<ID<Media>, Media>
}

const renderDescription = (description: string) => {
    if (!description || description.trim().length === 0) {
        return null;
    }

    return (
        <div className={"mt-2 text-sm italic text-secondary"}>
            {description}
        </div>
    )
}

const renderTechnique = (technique: string | undefined) => {
    if (!technique || technique.trim().length === 0) {
        return null;
    }

    return (
        <div className={"mt-1 text-sm"}>
            <span>Technik: </span>
            {technique}
        </div>
    )
}

const renderDimensions = (dimensions: Artwork["size"]) => {
    if (!dimensions) {
        return null;
    }

    const {height, width, depth, unit} = dimensions;
    let dimensionString = `${height} x ${width}`;
    if (depth) {
        dimensionString += ` x ${depth}`;
    }

    dimensionString += ` ${unit}`;

    return (
        <div className={"mt-1 text-sm"}>
            <span>Maße: </span>
            {dimensionString}
        </div>
    )
}

const SingleArtworkDisplay = (
    {
        artwork,
        mediaProvider
    }: SingleArtworkContent
) => {
    return (
            <div className={"mb-4"}>
                {
                    renderDescription(artwork.description)
                }
                <div className={"h-[80dvh] w-full"}>
                    <Swiper
                        modules={[Pagination, Navigation, Keyboard]}
                        className={"h-full w-full"}
                        navigation={true}
                        pagination={
                            {
                                clickable: true,
                                dynamicBullets: false,
                            }
                        }
                        direction={"horizontal"}
                        loop={true}
                    >
                        {artwork.mediaIds.map((id: ID<Media>) => {
                            return (
                                <SwiperSlide key={id} className={"h-full w-full bg-background"}>
                                    <img
                                        className={"object-contain object-center h-full w-full"}
                                        src={mediaProvider[id]?.url} alt={""}
                                        loading={"lazy"}/>
                                    <div className="swiper-lazy-preloader"></div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                {
                    renderTechnique(artwork.technique)
                }
                {
                    renderDimensions(artwork.size)
                }
            </div>
    )
}

export default SingleArtworkDisplay;