export default {
    name: 'landing_page',
    title: 'Startseite',
    type: 'document',
    fields: [
        {
            name: "background",
            title: "Hintergrund",
            type: "object",
            fields: [
                {
                    name: "mediaType",
                    title: "Medientyp",
                    type: "string",
                    options: {
                        list: [
                            { title: "Bild", value: "image" },
                            { title: "Video", value: "video" },
                        ],
                        layout: "radio",
                    },
                    validation: (Rule: any) => Rule.required(),
                },
                {
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: { hotspot: true },
                    hidden: ({ parent }: any) => parent?.mediaType !== "image",
                },
                {
                    name: "video",
                    title: "Video",
                    type: "file",
                    options: {
                        accept: "video/*",
                    },
                    hidden: ({ parent }: any) => parent?.mediaType !== "video",
                },
            ],
        }
    ],
    preview: {
        prepare() {
            return {
                title: "Startseite"
            }
        }
    }
}