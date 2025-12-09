import * as React from "react";
import {InstagramLogo} from "@/components/media/logo/InstagramLogo.tsx";
import {ArtstationLogo} from "@/components/media/logo/ArtstationLogo.tsx";
import {TwitterLogo} from "@/components/media/logo/TwitterLogo.tsx";

export interface LogoProps extends LogoInternalProps {
    logoId: LogoId | undefined;
}

export interface LogoInternalProps {
    className?: string;
}

export enum LogoId {
    Instagram = "instagram",
    Artstation = "artstation",
    Twitter = "twitter"
}

const LogoRegistry: Record<LogoId, React.FC<LogoInternalProps>> = {
    [LogoId.Instagram]: InstagramLogo,
    [LogoId.Artstation]: ArtstationLogo,
    [LogoId.Twitter]: TwitterLogo
}

export const Logo = (
    props: LogoProps) => {
    const logoId = props.logoId;
    if (!logoId) {
        return null;
    }
    const Entry = LogoRegistry[logoId];
    if (!Entry) return null;

    return <Entry {...props}/>
};