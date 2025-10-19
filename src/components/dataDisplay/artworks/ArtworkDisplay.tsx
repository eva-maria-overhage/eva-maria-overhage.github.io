import artworks from "@/data/Artworks.json";
import {ID} from "../../../../types/data/Shared.ts";
import {Artwork} from "../../../../types/data/Artwork.ts";
import Collapsible, {ClickListenerLocation} from "@/components/general/collapsible/Collapsible.tsx";
import SingleArtworkDisplay from "@/components/dataDisplay/artworks/SingleArtworkDisplay.tsx";
import {
    FirstOpenStrategy,
    InitialCollapsedStrategy
} from "@/components/dataDisplay/exhibitions/ExhibitionDisplay.config.ts";
import medias from "@/data/Medias.json";
import {Media} from "../../../../types/data/Media.ts";

export interface ArtworkDisplayProps {
    initialCollapsedStrategy?: InitialCollapsedStrategy;
}

const ArtworkDisplay = (
    {
        initialCollapsedStrategy = FirstOpenStrategy,
    }: ArtworkDisplayProps) => {

    const typedMedias = medias as unknown as Record<ID<Media>, Media>;

    return (
        <>
            <div className={"text-3xl font-bold mb-4 hidden lg:block"}>
                <h1>Werke</h1>
            </div>
            <div className={"flex flex-col w-full"}>
                {
                    Object.entries(artworks as unknown as Record<ID<Artwork>, Artwork>).filter(([, artwork]) => artwork?.mediaIds?.length).map(([artworkId, value], i) => {
                        return (
                            <Collapsible
                                key={artworkId}
                                header={
                                    <span translate={"no"}>
                                        {value.title}
                                    </span>
                            }
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
        </>
    )
}

export default ArtworkDisplay;