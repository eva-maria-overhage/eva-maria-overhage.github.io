export default {
    name: "exhibition_series",
    title: "Ausstellungsreihen",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Name",
            type: "string",
            description: "Name der Ausstellungsreihe",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            description: "Beschreibung der Ausstellungsreihe",
            validation: (Rule: any) => Rule.optional()
        }
    ]
}