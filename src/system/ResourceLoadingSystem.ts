export type BlobUrl = string;
export type ResourceId = string;


export interface Resource {
    url: string;
    blob: BlobUrl;
}

interface FetchingResource {
    state: RessourceState.FETCHING;
    promise: Promise<BlobUrl>;
}

interface ErrorResource {
    state: RessourceState.ERROR;
    error: string;
}

interface ReadyResource extends Resource {
    state: RessourceState.READY;
}

type InternalResource = FetchingResource | ErrorResource | ReadyResource;

export interface LoadableResource {
    id: ResourceId;
    url: string;
}

enum RessourceState {
    FETCHING,
    ERROR,
    READY
}

export class ResourceLoadingSystem {
    private static _instance: ResourceLoadingSystem;

    private readonly ressourceMap: Map<ResourceId, InternalResource>

    private readonly baseUrl;

    private debug(...args: unknown[]) {
        console.debug("[RessourceLoadingSystem]", ...args);
    }

    private log(...args: unknown[]) {
        console.log("[RessourceLoadingSystem]", ...args);
    }

    private error(...args: unknown[]) {
        console.error("[RessourceLoadingSystem]", ...args);
    }

    private constructor() {
        this.baseUrl = new URL(import.meta.url).origin;
        this.ressourceMap = new Map();
        this.log("Initialized with base URL:", this.baseUrl);
    }

    public static getInstance(): ResourceLoadingSystem {
        if (!this._instance) {
            this._instance = new ResourceLoadingSystem();
        }
        return this._instance;
    }

    public getResource = async (resource: LoadableResource): Promise<BlobUrl> => {
        return this.registerAndLoadResource(resource);
    }

    public awaitAll = async (...resources: LoadableResource[]): Promise<Record<ResourceId, BlobUrl>> => {
        this.debug("Attempting to load: ", resources);
        const promises = resources.map(r => this.getResource(r).then(url => ({ id: r.id, url })));
        const results = await Promise.allSettled(promises);

        const resourceMap: Record<ResourceId, BlobUrl> = {};
        results.forEach((res, i) => {
            const resourceId = resources[i].id;
            if (res.status === "fulfilled") {
                this.debug(`Resource loaded: ${resourceId}`);
                resourceMap[resourceId] = res.value.url;
            } else {
                this.error(`Failed to load resource ${resourceId}:`, res.reason);
            }
        });

        this.log("Successfully loaded resources:", Object.entries(resourceMap));

        return resourceMap;
    }

    private registerAndLoadResource = async (resource: LoadableResource): Promise<BlobUrl> => {
        const resourceId = resource.id;
        if (!resourceId || !resource.url) {
            throw new Error("Resource must have a valid id and url");
        }

        const existing = this.ressourceMap.get(resourceId);

        if (existing?.state === RessourceState.READY) {
            this.debug(`Resource already ready: ${resourceId}`);
            return existing.blob;
        }

        if (existing?.state === RessourceState.FETCHING) {
            this.debug(`Resource already being fetched: ${resourceId}`);
            return existing.promise;
        }

        const promise = this.loadResource(resource.url)
            .then(blobUrl => {
                this.ressourceMap.set(resourceId, {
                    state: RessourceState.READY,
                    url: resource.url,
                    blob: blobUrl
                });
                return blobUrl;
            })
            .catch(err => {
                this.ressourceMap.set(resourceId, {
                    state: RessourceState.ERROR,
                    error: err.message ?? "Unknown error"
                });
                throw err;
            });

        this.ressourceMap.set(resourceId, {
            state: RessourceState.FETCHING,
            promise
        });

        this.debug(`Started loading resource: ${resourceId}`);
        return promise;
    };

    private loadResource = async (url: string): Promise<BlobUrl> => {
        const absoluteUrl = new URL(url, this.baseUrl).href;
        this.debug("Fetching resource from", absoluteUrl);
        const data = await fetch(absoluteUrl);
        if (!data.ok) {
            throw new Error(`HTTP ${data.status}`);
        }
        const blob = await data.blob();
        return URL.createObjectURL(blob);
    };
}