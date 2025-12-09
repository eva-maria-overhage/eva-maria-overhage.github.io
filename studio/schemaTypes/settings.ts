export default {
    name: "settings",
    title: "Einstellungen",
    type: "document",
    fieldsets: [
        {name: "links", title: "Links", options: {collapsible: true}},
        {name: "features", title: "Features", options: {collapsible: true}}
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            initialValue: () => "Globale Einstellungen",
            hidden: true,
            readOnly: true,
        },
        {
            name: "email",
            title: "E-Mail",
            description: "E-Mail Addresse (Kontakt)",
            fieldset: "links",
            type: "string",
            validation: (Rule: any) => Rule.email().required()
        },
        {
            name: "social_media",
            title: "Social Media",
            fieldset: "links",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "social_media_entry",
                    fields: [
                        {
                            name: "Titel",
                            title: "Title",
                            type: "string",
                        },
                        {
                            name: "Link",
                            title: "Link",
                            type: "url",
                        },
                        {
                            name: "logo_id",
                            title: "Logo Id",
                            type: "string",
                            options: {
                                list: [
                                    {
                                        title: 'Instagram',
                                        value: 'instagram'
                                    },
                                    {
                                        title: 'X (Twitter)',
                                        value: 'twitter'
                                    },
                                    {
                                        title: 'Artstation',
                                        value: 'artstation'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: "enabled_sections",
            title: "Aktivierte Sektionen",
            fieldset: "features",
            description: "Wähle aus, welche Links im Header angezeigt werden sollen. Wenn du sie hier entfernst," +
                " werden diese Links nicht mehr im Header angezeigt. Die Seiten können aber von technisch versierten" +
                " Nutzern noch aufgerufen werden.",
            type: "array",
            of: [{type: "string"}],
            options: {
                list: [
                    {title: "Startseite", value: "root"},
                    {title: "Biographie", value: "biography"},
                    {title: "Kunstwerke", value: "artworks"},
                    {title: "Ausstellungen", value: "exhibitions"}
                ]
            },
            initialValue: ["root", "artworks", "exhibitions"]
        }
    ],
    preview: {
        prepare() {
            return {
                title: "Einstellungen"
            }
        }
    }
}