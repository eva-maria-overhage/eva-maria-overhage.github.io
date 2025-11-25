export const AVAILABLE_ROUTE = {
    ROOT: "root",
    ARTWORKS: 'artworks',
    EXHIBITIONS: 'exhibitions',
    BIOGRAPHY: 'biography',
} as const;

export type AvailableRoute = typeof AVAILABLE_ROUTE[keyof typeof AVAILABLE_ROUTE];

export type Settings = {
    email: string,
    enabled_sections: AvailableRoute[],
    instagram: string,
}