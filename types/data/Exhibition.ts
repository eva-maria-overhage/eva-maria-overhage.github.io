import {ISO8601Date, Reference, SanityIdObject} from "./Shared";
import {ExhibitionSeries} from "./ExhibitionSeries.ts";

export type Exhibition = {
    title: string;
    location: Reference<Location>
    series?: Reference<ExhibitionSeries>
    start_date: ISO8601Date;
    end_date?: ISO8601Date;
} & SanityIdObject;