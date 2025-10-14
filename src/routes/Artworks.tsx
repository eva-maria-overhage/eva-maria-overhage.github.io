import artworks from "@/data/Artworks.json";
import {ID} from "../../types/data/Shared.ts";
import {Artwork} from "../../types/data/Artwork.ts";
import Collapsible, {ClickListenerLocation} from "@/components/general/Collapsible.tsx";
import medias from "@/data/Medias.json";
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {Media} from "../../types/data/Media.ts";
import {useLoaderData} from "react-router";
import {ResourceLoadingSystem} from "@/system/ResourceLoadingSystem.ts";
import {
    FirstOpenStrategy,
    InitialCollapsedStrategy
} from "@/components/dataDisplay/exhibitions/ExhibitionDisplay.config.ts";

interface ArtworkLoaderData {
    medias: Record<string, Record<string, string>>;
}

const typedMedia = medias as Record<ID<Media>, Media>

export const ArtworkLoader = async (): Promise<ArtworkLoaderData> => {
    const workData = artworks;
    const jobs = Object.entries(workData).flatMap(([workId, resources]) => {
        return resources.mediaIds.map((resourceId) => {
                const associatedMedia = typedMedia[resourceId];

                if (associatedMedia === undefined) {
                    return null;
                }

                return {
                    workId: workId,
                    resourceId: resourceId,
                    url: associatedMedia.url
                };
            }
        )
    }).filter((f) => {
        return f !== null;
    }).map((f) => {
        return {
            id: `${f!.workId}/${f!.resourceId}`,
            url: f?.url
        }
    });

    const loadingSystem = ResourceLoadingSystem.getInstance();

    const ressourceMap = await loadingSystem.awaitAll(...jobs);

    const objectMap: Record<string, Record<string, string>> = {}
    Object.entries(ressourceMap).forEach(([key, value]) => {
        const [workId, resourceId] = key.split("/");
        console.debug("Mapping resource:", key, "to", value);
        if (!objectMap[workId]) objectMap[workId] = {};
        objectMap[workId][resourceId] = value;
    })


    return {medias: objectMap};
}

export interface ArtworksProps {
    initialCollapsedStrategy?: InitialCollapsedStrategy;
}

const Artworks = (
    {
        initialCollapsedStrategy = FirstOpenStrategy
    }: ArtworksProps
) => {

    const loadedData = useLoaderData<ArtworkLoaderData>();

    return (
        <div className={"w-full h-full flex justify-center align-center"}>
            <div className={"mx-12 my-3 w-full"}>
                <div className={"flex flex-col w-full"}>
                    {
                        Object.entries(artworks as unknown as Record<ID<Artwork>, Artwork>).filter(([, artwork]) => artwork?.mediaIds?.length).map(([artworkId, value], i) => {
                            return (
                                <Collapsible
                                    key={artworkId}
                                    header={value.title}
                                    className={"w-full"}
                                    initialCollapsed={initialCollapsedStrategy(i)}
                                    clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                >
                                    <div className={""}>
                                        <div>
                                            {value.description}
                                        </div>
                                        <div>
                                            {value.technique}
                                        </div>
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
                                                {value.mediaIds.map((id) => {
                                                    return (
                                                        <SwiperSlide key={id} className={"h-full w-full bg-background"}>
                                                            <img
                                                                className={"object-contain object-center h-full w-full"}
                                                                src={loadedData.medias?.[artworkId]?.[id]} alt={""}
                                                                loading={"lazy"}/>
                                                            <div className="swiper-lazy-preloader"></div>
                                                        </SwiperSlide>
                                                    )
                                                })}

                                            </Swiper>
                                        </div>
                                    </div>
                                </Collapsible>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )

}

export default Artworks;