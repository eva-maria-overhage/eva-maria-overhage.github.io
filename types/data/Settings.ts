import {RemoteURL} from "./Shared.ts";
import {LogoId} from "@/components/media/logo/Logo.tsx";

export const AVAILABLE_ROUTE = {
    ROOT: "root",
    ARTWORKS: 'artworks',
    EXHIBITIONS: 'exhibitions',
    BIOGRAPHY: 'biography',
} as const;

export type AvailableRoute = typeof AVAILABLE_ROUTE[keyof typeof AVAILABLE_ROUTE];

export type SocialMediaRef = {
    name: string;
    link: RemoteURL;
    logo_id: LogoId;
}

export type Settings = {
    email: string,
    enabled_sections: AvailableRoute[],
    social_media: SocialMediaRef[]
}