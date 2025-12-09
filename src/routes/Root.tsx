import {NavLink, Outlet, ScrollRestoration, useLoaderData, useLocation} from "react-router";
import OutletWrapper from "../components/general/OutletWrapper.tsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
import {cn} from "@/lib/utils.ts";
import {AVAILABLE_ROUTE, AvailableRoute, Settings} from "../../types/data/Settings.ts";
import {getSanityData} from "@/lib/sanity.ts";
import {Logo, LogoId} from "@/components/media/logo/Logo.tsx";

const SANITY_QUERY = `*[_id == "SETTING_SINGLETON"][0] {
  email,
  enabled_sections,
  social_media
}`

export const loader = async () => {
    const sanityData = await getSanityData<Settings>(SANITY_QUERY);
    return {
        settings: sanityData
    } as LoaderData;
}

interface LoaderData {
    settings: Settings;
}

interface SimpleLink {
    label: string
    location: string
}

const links: Record<AvailableRoute, SimpleLink> = {
    [AVAILABLE_ROUTE.ROOT]: {label: "Startseite", location: "/"},
    [AVAILABLE_ROUTE.BIOGRAPHY]: {label: "Biographie", location: "/about"},
    [AVAILABLE_ROUTE.ARTWORKS]: {label: "Werke", location: "/artworks"},
    [AVAILABLE_ROUTE.EXHIBITIONS]: {label: "Ausstellungen", location: "/exhibitions"},
};

const pathToLabel = (path: string) => {
    return Object
        .values(links)
        .filter((route) => route.location === path)[0]?.label;
}

const Root = () => {

    const loaderData = useLoaderData<LoaderData>();
    const settings = loaderData.settings;

    const location = useLocation();
    const linkEntries = Object.entries(links)
        .filter(([route]) => settings.enabled_sections.includes(route as AvailableRoute))

    return (
        <>
            <header className={"w-full fixed grid z-10 top-0 bg-background overflow-hidden text-primary"}>
                <div className={"flex h-[80px] w-full"}>
                    <div className={"w-full h-full px-15 hidden lg:flex"}>
                        <div className={"flex justify-start items-center font-bold text-lg"}>
                            Eva-Maria Overhage
                        </div>
                        <div className={"flex justify-end items-center flex-1"}>
                            {
                                linkEntries.map(([route, link]) => {
                                    return (
                                        <div key={route} className={"inline-flex h-full"}>
                                            <div className={"static px-4 flex justify-center items-center"}>
                                                <NavLink to={link.location} tabIndex={-1}>
                                                    <p className={"cool-underline transition-all hover:scale-105"}
                                                       tabIndex={0}>{link.label}</p>
                                                </NavLink>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div
                        className="flex lg:hidden items-center text-lg px-[5%] h-full w-full text-primary flex-row justify-end">
                        <div className={"flex justify-start items-center font-bold text-xl w-full"}>
                            {
                                pathToLabel(location.pathname)
                            }
                        </div>
                        <Sheet>
                            <SheetTrigger>
                                <p className={"text-2xl flex-1"}>☰</p>
                            </SheetTrigger>
                            <SheetContent side={"right"} className="w-max-[100dvw] w-full">
                                <SheetHeader>
                                    <SheetTitle className={"text-3xl"}>
                                        Navigation
                                    </SheetTitle>
                                </SheetHeader>
                                {linkEntries.map(([route, link]) => (
                                    <div key={route} className="pl-4">
                                        <div className={"w-fit text-xl"}>
                                            <SheetClose asChild>
                                                <NavLink to={link.location} tabIndex={-1}>
                                                        <span
                                                            className={cn("cool-underline dummy-transition")}
                                                            tabIndex={0}>{link.label}</span>
                                                </NavLink>
                                            </SheetClose>
                                        </div>
                                    </div>
                                ))}
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <ScrollRestoration/>
            <main className={"h-fit min-h-[100dvh] pt-[80px] w-full relative"}>
                <OutletWrapper key={location.pathname}>
                    <Outlet/>
                </OutletWrapper>
            </main>
            <footer>
                <div className={"w-full bg-(--background) overflow-hidden py-4 px-6"}>
                    <div
                        className={"relative grid grid-cols-2 grid-flow-row px-4 lg:justify-between lg:grid-flow-col lg:grid-rows-[auto] lg:px-[max(calc(var(--spacing)*4),calc(50%-500px))]"}>
                        <div className={"flex flex-col w-fit my-4"}>
                            <h3 className={"font-bold text-lg mb-2"}>Social Media</h3>
                            {
                                settings.social_media?.map((entry) => (
                                    <div className={"flex flex-row gap-1 items-center"} key={entry.name}>
                                        <Logo logoId={entry.logo_id as LogoId}
                                              className={"h-8 aspect-square overflow-hidden"}/>
                                        <p className={"cool-underline w-fit"}>
                                            <NavLink to={entry.link}
                                                     target={"_blank"}>
                                                Instagram
                                            </NavLink>
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={"flex flex-col w-fit my-4"}>
                            <h3 className={"font-bold text-lg mb-2"}>Rechtliches</h3>
                            <p className={"cool-underline w-fit"}>
                                <NavLink to={"/imprint"}
                                         target={"_blank"}>
                                    Impressum
                                </NavLink>
                            </p>
                            <p className={"cool-underline w-fit"}>
                                <NavLink to={`mailto:${settings.email}`} target={"_blank"}>
                                    Kontakt
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}


export default Root;
