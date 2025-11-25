import DynamicBackground from "@/components/media/DynamicBackground.tsx";
import {ImageBackground, VideoBackground} from "../../types/data/LandingPage.ts";
import {Override, RemoteURL} from "../../types/data/Shared.ts";
import {getSanityData} from "@/lib/sanity.ts";
import {Await, useLoaderData} from "react-router";
import DefaultFallbackWrapper from "@/components/general/DefaultFallbackWrapper.tsx";
import Loader from "@/components/general/Loader.tsx";
import {Suspense} from "react";

const SANITY_QUERY = `*[_id == "LANDING_SINGLETON"][0] {
  background {
    mediaType,
    "video": video.asset->url,
    "image": image.asset->url
  }
}`

export type LandingSectionQueryResult = {
    background: ResolvedBackground
}

export type ResolvedBackground = Override<VideoBackground, {
    video: RemoteURL
}> | Override<ImageBackground, {
    image: RemoteURL
}>

interface HomeLoaderData {
    home: Promise<LandingSectionQueryResult>
}

export const loader = () => {
    return ({
        home: getSanityData<LandingSectionQueryResult>(SANITY_QUERY)
    }) as HomeLoaderData;
}

const Home = () => {

    const homeData = useLoaderData<HomeLoaderData>();

    return (

        <Suspense fallback={
            <DefaultFallbackWrapper>
                <Loader/>
            </DefaultFallbackWrapper>
        }>
            <Await resolve={homeData.home}>
                {(home) => (
                    <DefaultFallbackWrapper>
                        <div
                            className={"absolute h-full w-full z-[-1] flex items-center justify-center overflow-hidden opacity-50"}>
                            <DynamicBackground background={home.background} className={"h-full w-full object-center object-cover"}/>
                        </div>
                    </DefaultFallbackWrapper>
                )}
            </Await>
        </Suspense>
    )
}

export default Home;