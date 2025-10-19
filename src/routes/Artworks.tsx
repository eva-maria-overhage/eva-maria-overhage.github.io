import artworks from "@/data/Artworks.json";
import {ID} from "../../types/data/Shared.ts";
import {Artwork} from "../../types/data/Artwork.ts";
import Collapsible, {ClickListenerLocation} from "@/components/general/Collapsible.tsx";
import medias from "@/data/Medias.json";
import {
    FirstOpenStrategy,
    InitialCollapsedStrategy
} from "@/components/dataDisplay/exhibitions/ExhibitionDisplay.config.ts";
import {Media} from "../../types/data/Media.ts";
import SingleArtworkDisplay from "@/components/dataDisplay/artworks/SingleArtworkDisplay.tsx";


export interface ArtworksProps {
    initialCollapsedStrategy?: InitialCollapsedStrategy;
}

const Artworks = (
    {
        initialCollapsedStrategy = FirstOpenStrategy
    }: ArtworksProps
) => {

    const typedMedias = medias as unknown as Record<ID<Media>, Media>;

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
                                    className={"w-full text-lg"}
                                    initialCollapsed={initialCollapsedStrategy(i)}
                                    clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                >
                                    <SingleArtworkDisplay artwork={value} mediaProvider={typedMedias}/>
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