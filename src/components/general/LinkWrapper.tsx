import {RemoteURL} from "../../../types/data/Shared.ts";
import {ReactNode} from "react";

export interface LinkWrapperProps {
    wrapperClass: string;
    url?: RemoteURL;
    children: ReactNode;
}


const LinkWrapper = (
    {
        wrapperClass,
        url,
        children
    }: LinkWrapperProps
) => {

    if (url) {
        return (
            <a href={url}
               target={"_blank"}
               referrerPolicy={"no-referrer"}
               className={wrapperClass}
               style={{
                   textDecoration: "none",
                   cursor: "pointer",
               }}
            >
                {children}
            </a>
        )
    }

    return (
        <div className={wrapperClass}>
            {children}
        </div>
    )
}

export default LinkWrapper;