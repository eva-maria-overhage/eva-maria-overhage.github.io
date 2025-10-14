import {ID, ISO8601Date,} from "./Shared";
import {Employer} from "./Employer";

export interface Employment {
    position: string;
    department?: string;
    employerId: ID<Employer>;
    startDate: ISO8601Date;
    endDate?: ISO8601Date;
}