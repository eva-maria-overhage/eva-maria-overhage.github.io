import {ISO8601Date} from "./Shared";

export interface Exhibition {
    startDate: ISO8601Date;
    endDate?: ISO8601Date;
    name: string;
    location: string;
}