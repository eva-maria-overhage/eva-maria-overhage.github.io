export default {
    name: "locations",
    title: "Standorte",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Titel",
            type: "string",
            description: "Anzeigename des Standorts",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
            description: "Logo des Standorts",
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.optional()
        },
        {
            name: "link",
            title: "Website",
            type: "url",
            description: "Website des Standorts",
            validation: (Rule: any) => Rule.optional()
        }
    ],
    preview: {
        select: {
            title: "title",
            logo: "logo"
        },
        prepare({title, logo}: any) {
            return {
                title,
                media: logo
            }
        }
    }
}