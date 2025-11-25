import ExhibitionDisplay from "../components/dataDisplay/exhibitions/ExhibitionDisplay.tsx";
import DefaultRouteAlignment from "@/components/general/DefaultRouteAlignment.tsx";
import {Override, RemoteURL, Resolved} from "../../types/data/Shared.ts";
import {Exhibition} from "../../types/data/Exhibition.ts";
import {Location} from "../../types/data/Location.ts";
import {getSanityData} from "@/lib/sanity.ts";
import {Await, useLoaderData} from "react-router";
import DefaultFallbackWrapper from "@/components/general/DefaultFallbackWrapper.tsx";
import Loader from "@/components/general/Loader.tsx";
import {Suspense} from "react";

const SANITY_QUERY = `*[_type == "exhibition"] {
  "id": _id,
  title,
  start_date,
  end_date,
  "location": location-> {
    "id": _id,
    title,
    link,
    "logo": logo.asset->url
  }
}`

export type SingleResolvedExhibition = Resolved<Override<Exhibition, {
    location: Override<Location, {
        logo: RemoteURL
    }>
}>>

export type ExhibitionsSanityQueryResult = SingleResolvedExhibition[]

interface ExhibitionsLoaderData {
    exhibitions: Promise<ExhibitionsSanityQueryResult>
}

export const loader = async () => {
    return ({
        exhibitions: getSanityData<ExhibitionsSanityQueryResult>(SANITY_QUERY)
    });
}

const Exhibitions = () => {

    const exhibitionData = useLoaderData<ExhibitionsLoaderData>();

    return (
        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={exhibitionData.exhibitions}>
                {(exhibitions) => (
                    <DefaultRouteAlignment>
                        <ExhibitionDisplay exhibitions={exhibitions}/>
                    </DefaultRouteAlignment>
                )}
            </Await>
        </Suspense>
    )
}

export default Exhibitions;