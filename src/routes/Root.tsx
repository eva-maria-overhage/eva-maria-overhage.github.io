import {NavLink, Outlet, ScrollRestoration, useLocation} from "react-router";
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

interface SimpleLink {
    label: string
}

const links: Record<string, SimpleLink> = {
    "/": {label: "Startseite"},
    //"/about": {label: "Biographie"},
    "/artworks": {label: "Werke"},
    "/exhibitions": {label: "Ausstellungen"},
};

const Root = () => {

    const location = useLocation();
    const linkEntries = Object.entries(links);

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
                               linkEntries.map(([to, link]) => {
                                    return (
                                        <div key={to} className={"inline-flex h-full"}>
                                            <div className={"static px-4 flex justify-center items-center"}>
                                                <NavLink to={to} tabIndex={-1}>
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
                    <div className="flex lg:hidden items-center text-lg px-[5%] h-full w-full text-primary flex-row justify-end">
                        <div className={"flex justify-start items-center font-bold text-xl w-full"}>
                            {
                                links[location.pathname].label
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
                                {linkEntries.map(([to, link]) => (
                                    <div key={to} className="pl-4">
                                        <div className={"w-fit text-xl"}>
                                            <SheetClose asChild>
                                                <NavLink to={to} tabIndex={-1}>
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
                <div className={"w-full min-h-30 flex flex-row items-center justify-center relative bg-(--background)"}>
                    <div className={"px-4"}>
                        <NavLink to={"/imprint"} target={"_blank"}>
                            <p className={"cool-underline"}>Impressum</p>
                        </NavLink>
                    </div>
                    <div className={"px-4"}>
                        <NavLink to={"mailto:eva-maria.overhage@gmx.de"} target={"_blank"}>
                            <p className={"cool-underline"}>Kontakt</p>
                        </NavLink>
                    </div>
                </div>
            </footer>
        </>
    )
}


export default Root;
