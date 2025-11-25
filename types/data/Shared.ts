export type ISO8601Date = string;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ID<T> = string;
export type LocalURL = string;
export type RemoteURL = string;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Reference<T> = { __type: "reference" };

type ResolveReference<T> = T extends Reference<infer U>[]
    ? (U & SanityIdObject)[]
    : T extends Reference<infer U>
        ? U & SanityIdObject
        : T;

export type SanityIdObject = {
    id: string;
}

export type Resolved<T> = {
    [K in keyof T]: ResolveReference<T[K]>
};

export type Override<T, Overrides extends Partial<Record<keyof T, any>>> = T extends any
    ? Omit<T, keyof Overrides> & Overrides
    : never;

export type SanityFileAsset = {
    _createdAt: ISO8601Date;
    _id: string;
    _originalId: string;
    _rev: string;
    _type: string;
    _updatedAt: ISO8601Date;
    assetId: string;
    extension: string;
    mimeType: string;
    originalFilename: string;
    path: string;
    sha1hash: string;
    size: number;
    uploadId: string;
    url: RemoteURL;
}

export type SanityImageAsset = {
    metadata: {
        _type: string;
        blurHash: string;
        dimensions: {
            _type: string;
            aspectRatio: number;
            height: number;
            width: number;
        };
        hasAlpha: boolean;
        isOpaque: boolean;
        lqip: string;
    }
} & SanityFileAsset;