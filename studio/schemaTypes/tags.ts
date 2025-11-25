export default {
    name: "tags",
    title: "Tags",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Titel / Anzeigename",
            type: "string",
            description: "Titel bzw. Anzeigename des Tags; sollte recht kurz sein",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "description",
            title: "Beschreibung",
            type: "string",
            description: "Beschreibung des Tags, hier auch gerne ausführlicher",
            validation: (Rule: any) => Rule.optional()
        },
        {
            name: "icon",
            title: "Icon",
            type: "image",
            description: "Icon für den Tag",
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.optional()
        }
    ],
    preview: {
        select: {
            title: "title",
            logo: "icon"
        },
        prepare({ title, logo }: any) {
            return {
                title,
                media: logo
            }
        }
    }
}