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
    to: string
    label: string
}

const links: SimpleLink[] = [
    {to: "/", label: "Startseite"},
    //{to: "/about", label: "Biographie"},
    {to: "/artworks", label: "Werke"},
    {to: "/exhibitions", label: "Ausstellungen"},
];

const Root = () => {

    const location = useLocation();

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
                                links.map((link) => {
                                    return (
                                        <div key={link.to} className={"inline-flex h-full"}>
                                            <div className={"static px-4 flex justify-center items-center"}>
                                                <NavLink to={link.to} tabIndex={-1}>
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
                    <div className="flex lg:hidden items-center text-lg ml-[5%] h-full w-full text-primary">
                        <Sheet>
                            <SheetTrigger>
                                <p className={"text-2xl"}>☰</p>
                            </SheetTrigger>
                            <SheetContent side={"left"} className="w-max-[100dvw] w-full">
                                <SheetHeader>
                                    <SheetTitle className={"text-3xl"}>
                                        Navigation
                                    </SheetTitle>
                                </SheetHeader>
                                {links.map((link) => (
                                    <div key={link.to} className="pl-4">
                                        <div className={"w-fit text-xl"}>
                                            <SheetClose asChild>
                                                <NavLink to={link.to} tabIndex={-1}>
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
