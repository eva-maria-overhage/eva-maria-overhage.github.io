import MediaDisplay from "@/components/media/MediaDisplay.tsx";

const Home = () => {

    return (
        <>
            <div className={"h-[calc(100dvh-80px)] w-full flex items-center justify-center overflow-hidden relative"}>
                <div
                    className={"absolute h-full w-full z-[-1] flex items-center justify-center overflow-hidden opacity-50"}>
                    <MediaDisplay mediaId={"hero-video"} className={"h-full w-full object-center"}/>
                </div>
            </div>
        </>
    )
}

export default Home;