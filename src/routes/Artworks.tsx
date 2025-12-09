import DefaultRouteAlignment from "@/components/general/DefaultRouteAlignment.tsx";
import ArtworkDisplay from "@/components/dataDisplay/artworks/ArtworkDisplay.tsx";
import {Suspense} from "react";
import DefaultFallbackWrapper from "@/components/general/DefaultFallbackWrapper.tsx";
import Loader from "@/components/general/Loader.tsx";
import {Await, useLoaderData} from "react-router";
import {Override, Reference, RemoteURL, Resolved} from "../../types/data/Shared.ts";
import {Artwork} from "../../types/data/Artwork.ts";
import {getSanityData} from "@/lib/sanity.ts";


const SANITY_QUERY = `*[_type == "works"]|order(orderRank) {
  "id": _id,
  title,
  has_description,
  description,
  publish_date,
  "media": media[].asset->{
    "id": _id,
    url,
  },
  size,
  "tags": tags[]->{
    "id": _id,
    title
  },
}`

export type SingleResolvedArtwork = Resolved<Override<Artwork, {
    media: Reference<({
        url: RemoteURL
    })>[]
    tags: Reference<{
        title: string
    }>[]
}>>

export type WorksSanityQueryResult = SingleResolvedArtwork[]

interface WorksLoaderData {
    works: Promise<WorksSanityQueryResult>
}

export const loader = async () => {
    return ({
        works: getSanityData<WorksSanityQueryResult>(SANITY_QUERY)
    }) as WorksLoaderData;
}

const Artworks = () => {

    const workData = useLoaderData<WorksLoaderData>();

    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={workData.works}>
                {(works) => (
                    <DefaultRouteAlignment>
                        <ArtworkDisplay data={works} />
                    </DefaultRouteAlignment>
                )}
            </Await>
        </Suspense>
    )

}

export default Artworks;