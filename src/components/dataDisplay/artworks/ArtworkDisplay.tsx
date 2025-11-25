import Collapsible, {ClickListenerLocation} from "@/components/general/collapsible/Collapsible.tsx";
import SingleArtworkDisplay from "@/components/dataDisplay/artworks/SingleArtworkDisplay.tsx";
import {
    FirstOpenStrategy,
    InitialCollapsedStrategy
} from "@/components/dataDisplay/exhibitions/ExhibitionDisplay.config.ts";
import {WorksSanityQueryResult} from "@/routes/Artworks.tsx";

export interface ArtworkDisplayProps {
    data: WorksSanityQueryResult;
    initialCollapsedStrategy?: InitialCollapsedStrategy;
}

const ArtworkDisplay = (
    {
        data,
        initialCollapsedStrategy = FirstOpenStrategy,
    }: ArtworkDisplayProps) => {

    return (
        <>
            <div className={"text-3xl font-bold mb-4 hidden lg:block"}>
                <h1>Werke</h1>
            </div>
            <div className={"flex flex-col w-full"}>
                {

                    Array.from(data)
                        .filter((artwork) => artwork?.media?.length > 0)
                        .map((value, i) => {
                            return (
                                <Collapsible
                                    key={value.id}
                                    header={
                                        <span translate={"no"}>
                                            {value.title}
                                        </span>
                                    }
                                    className={"w-full text-lg"}
                                    initialCollapsed={initialCollapsedStrategy(i)}
                                    clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                >
                                    <SingleArtworkDisplay artwork={value}/>
                                </Collapsible>
                            )
                        })
                }
            </div>
        </>
    )
}

export default ArtworkDisplay;