export default {
    name: "settings",
    title: "Einstellungen",
    type: "document",
    fieldsets: [
        { name: "links", title: "Links", options: { collapsible: true } },
        { name: "features", title: "Features", options: { collapsible: true } }
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
            name: "instagram",
            title: "Instagram",
            description: "Kompletter Link zu deinem Instagram Profil",
            fieldset: "links",
            type: "url"
        },
        {
            name: "enabled_sections",
            title: "Aktivierte Sektionen",
            fieldset: "features",
            description: "Wähle aus, welche Links im Header angezeigt werden sollen. Wenn du sie hier entfernst," +
                " werden diese Links nicht mehr im Header angezeigt. Die Seiten können aber von technisch versierten" +
                " Nutzern noch aufgerufen werden.",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Startseite", value: "root" },
                    { title: "Biographie", value: "biography" },
                    { title: "Kunstwerke", value: "artworks" },
                    { title: "Ausstellungen", value: "exhibitions" }
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