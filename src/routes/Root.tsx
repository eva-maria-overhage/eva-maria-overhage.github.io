import {NavLink, Outlet, ScrollRestoration, useLocation} from "react-router";
import OutletWrapper from "../components/general/OutletWrapper.tsx";

interface SimpleLink {
    to: string
    label: string
}

const links: SimpleLink[] = [
    {to: "/", label: "Startseite"},
    //{to: "/about", label: "Biographie"},
    {to: "/artworks", label: "Kunstwerke"},
    {to: "/exhibitions", label: "Ausstellungen"},
];

const Root = () => {

    const location = useLocation();

    return (
        <>
            <header className={"w-full h-[80px] fixed z-[2000] top-0 bg-(--background) overflow-hidden"}>
                <div className={"flex w-full h-full px-15"}>
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
                        <NavLink to={"mailto:test@google.com"} target={"_blank"}>
                            <p className={"cool-underline"}>Kontakt</p>
                        </NavLink>
                    </div>
                </div>
            </footer>
        </>
    )
}


export default Root;
