import {createClient} from "@sanity/client";

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2025-01-01',
});

export function getSanityData<T>(query: string): Promise<T> {
    return sanityClient.fetch<T>(query);
}
