// =============================================================================
// ============================ Collapse Strategies ============================
// =============================================================================
export type InitialCollapsedStrategy = (index: number) => boolean;

export const AllOpenStrategy: InitialCollapsedStrategy = () => false;
export const AllClosedStrategy: InitialCollapsedStrategy = () => true;
export const FirstOpenStrategy: InitialCollapsedStrategy = (index: number) => index !== 0;

// =============================================================================
// ========================== Date Display Strategies ==========================
// =============================================================================

export type DateDisplayStrategy = (startDate: Date, endDate?: Date) => string;

export const DisplayStartYearStrategy = (startDate: Date) => {
    return startDate.toLocaleDateString(undefined, {year: 'numeric'});
}

export const DisplayStartYearMonthStrategy = (date: Date) => {
    return date.toLocaleDateString(undefined, {year: 'numeric', month: '2-digit'});
}

export const DisplayFullStartDateStrategy = (date: Date) => {
    return date.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
}

export const DisplayStartMonthLongStrategy = (date: Date) => {
    return date.toLocaleDateString(undefined, {month: 'long'});
}


// =============================================================================
// ========================== Date Ordering Strategies =========================
// =============================================================================

export const YearToDateTimeOrderingAdapter = (ordering: DateTimeOrderingStrategy, yearA: string, yearB: string) => {
    return ordering(parseInt(yearA), parseInt(yearB));
}
export const DateToDateTimeOrderingAdapter = (ordering: DateTimeOrderingStrategy, dateA: Date, dateB: Date) => {
    return ordering(dateA.getTime(), dateB.getTime());
}
export type DateTimeOrderingStrategy = (timeA: number, timeB: number) => number;


export const AscendingDateTimeStrategy: DateTimeOrderingStrategy = (timeA: number, timeB: number) => {
    return timeA - timeB;
}

export const DescendingDateTimeStrategy: DateTimeOrderingStrategy = (timeA: number, timeB: number) => {
    return timeB - timeA;
}