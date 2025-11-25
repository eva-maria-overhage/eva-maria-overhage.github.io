import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {SingleResolvedArtwork} from "@/routes/Artworks.tsx";

export interface SingleArtworkDisplayProps {
    artwork: SingleResolvedArtwork;
}

const renderDescription = (artwork: SingleResolvedArtwork) => {
    if (!artwork.hasDescription) return null;

    return (
        <div className={"mt-2 text-sm italic text-secondary"}>
            {artwork.description}
        </div>
    )
}


const renderDimensions = (dimensions: SingleResolvedArtwork["size"]) => {
    if (!dimensions) {
        return null;
    }

    const {height, width, depth} = dimensions;
    let dimensionString = `${height} x ${width}`;
    if (depth) {
        dimensionString += ` x ${depth}`;
    }

    dimensionString += ` cm`;

    return (
        <div className={"mt-1 text-sm"}>
            <span>Maße: </span>
            {dimensionString}
        </div>
    )
}

const SingleArtworkDisplay = (
    {
        artwork
    }: SingleArtworkDisplayProps
) => {
    return (
        <div className={"mb-4"}>
            {
                renderDescription(artwork)
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
                    {artwork.media.map(({url, id}) => {
                        return (
                            <SwiperSlide key={id} className={"h-full w-full bg-background"}>
                                <img
                                    className={"object-contain object-center h-full w-full"}
                                    src={url} alt={""}
                                    loading={"lazy"}/>
                                <div className="swiper-lazy-preloader"></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            {
                renderDimensions(artwork.size)
            }
        </div>
    )
}

export default SingleArtworkDisplay;