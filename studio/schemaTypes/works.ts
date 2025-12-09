import {orderRankField, orderRankOrdering} from "@sanity/orderable-document-list";

export default {
    name: "works",
    title: "Werke",
    type: "document",

    orderings: [orderRankOrdering],

    fields: [
        {
            name: "title",
            title: "Titel",
            type: "string",
            description: "Titel des Werks",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "has_description",
            title: "Hat Beschreibung ?",
            type: "boolean",
            initialValue: () => false,
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "description",
            title: "Beschreibung / Infotext",
            type: "text",
            hidden: ({parent}: any) => !parent?.has_description
        },
        {
            name: "publish_date",
            title: "Datum der Veröffentlichung",
            type: "date",
            initialValue: () => {
                const date = new Date();
                const offset = date.getTimezoneOffset()
                const returnDate = new Date(date.getTime() - (offset*60*1000))
                return returnDate.toISOString().split('T')[0]
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "media",
            title: "Bilder / Videos",
            type: "array",
            of: [
                {
                    type: "image",
                    title: "Bild",
                    options: { hotspot: true },
                },
                {
                    type: "file",
                    title: "Video",
                    options: {
                        accept: "video/*",
                    },
                },
            ],
            validation: (Rule: any) => Rule.unique(),
        },
        {
            name: "size",
            title: "Maße",
            type: "object",
            fields: [
                {
                    name: "height",
                    title: "Höhe in cm",
                    type: "number",
                    validation: (Rule: any) => Rule.required().positive().precision(2),
                    description: "Höhe",
                },
                {
                    name: "width",
                    title: "Breite in cm",
                    type: "number",
                    validation: (Rule: any) => Rule.required().positive().precision(2),
                    description: "Breite",
                },
                {
                    name: "depth",
                    title: "Tiefe in cm",
                    type: "number",
                    validation: (Rule: any) => Rule.positive().precision(2),
                    description: "Tiefe",
                },
            ],
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            description: "Tags des Werks",
            of: [
                { type: "reference", to: [{ type: "tags" }]}
            ],
            validation: (Rule: any) => Rule.unique(),
        },
        orderRankField({ type: 'works', newItemPosition: 'before', }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'publish_date',
            medias: 'media'
        },
        prepare({ title, date, medias }: any) {
            const mediasCount = Array.isArray(medias) ? medias.length : "?";

            return {
                title,
                subtitle: `${mediasCount} Medien • ${date ?? ''}`,
            };
        }
    }
}