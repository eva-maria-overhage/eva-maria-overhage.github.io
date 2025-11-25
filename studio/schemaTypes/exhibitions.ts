export default {
    name: "exhibition",
    title: "Ausstellungen",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Titel",
            type: "string",
            description: "Titel der Ausstellung",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "location",
            title: "Standort",
            type: "reference",
            to: [{ type: "locations" }],
            description: "Ort der Ausstellung",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "series",
            title: "Ausstellungsreihe",
            type: "reference",
            to: [{ type: "exhibition_series" }],
            description: "Reihe der Ausstellung",
            validation: (Rule: any) => Rule.optional()
        },
        {
            name: "start_date",
            title: "Start Datum",
            type: "date",
            description: "Start Datum der Ausstellung (YYYY-MM-DD)",
            validation: (Rule: any) => Rule.required()
        },
        {
            name: "end_date",
            title: "End Datum",
            type: "date",
            description: "End Datum der Ausstellung (YYYY-MM-DD)",
            validation: (Rule: any) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title',
            startDate: 'start_date',
            endDate: 'end_date',
            logo: 'location_logo'
        },
        prepare({ title, startDate, endDate, logo }: any) {
            const options = {
                timeZone: 'Europe/Berlin',
                day: '2-digit',
                month: '2-digit',
                year: "numeric",
            }

            const start = new Date(startDate);
            const end = new Date(endDate);


            return {
                title,
                //@ts-ignore
                subtitle: `${start.toLocaleString('de-DE', options)} - ${end.toLocaleString('de-DE', options)}`,
            };
        }
    }
}