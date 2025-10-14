import {Exhibition} from "../../../../types/data/Exhibition.ts";
import exhibitions from "@/data/Exhibitions.json";
import styles from "./ExhibitionDisplay.module.css";
import Collapsible, {ClickListenerLocation} from "../../general/Collapsible.tsx";
import {
    DateTimeOrderingStrategy, DateToDateTimeOrderingAdapter, DescendingDateTimeStrategy,
    FirstOpenStrategy,
    InitialCollapsedStrategy, YearToDateTimeOrderingAdapter,
    DateDisplayStrategy, DisplayMonthLongStrategy,

} from "./ExhibitionDisplay.config.ts";
import {ID} from "../../../../types/data/Shared.ts";

export interface ExhibitionDisplayProps {
    collapseStrategy?: InitialCollapsedStrategy;
    dateTimeStrategy?: DateTimeOrderingStrategy;
    dateDisplayStrategy?: DateDisplayStrategy;
}

export interface InternalExhibitionData extends Exhibition {
    id: ID<Exhibition>;
    startDateObject: Date;
    endDateObject: Date;
}


const dataToInternalMapping = (exhibitions: Record<ID<Exhibition>, Exhibition>): Map<string, InternalExhibitionData[]> => {
    return Object.entries(exhibitions)
        .map(([id, exhibitions]) => {
            const newData = exhibitions as unknown as InternalExhibitionData;
            newData.startDateObject = new Date(exhibitions.startDate);
            newData.endDateObject = new Date(exhibitions.endDate ?? exhibitions.startDate);
            newData.id = id;
            return newData;
        }).reduce((previousValue, currentValue) => {
            const year = currentValue.startDateObject.getFullYear().toString();
            let yearEntries = previousValue.get(year);
            if (yearEntries === undefined) {
                yearEntries = [];
                previousValue.set(year, yearEntries);
            }
            yearEntries.push(currentValue);
            return previousValue;
        }, new Map<string, InternalExhibitionData[]>());
}

const ExhibitionDisplay = (
    {
        collapseStrategy = FirstOpenStrategy,
        dateTimeStrategy = DescendingDateTimeStrategy,
        dateDisplayStrategy = DisplayMonthLongStrategy
    }: ExhibitionDisplayProps
) => {

    const exhibitionsMapping = dataToInternalMapping(exhibitions);

    const today = new Date();

    if (exhibitionsMapping.size === 0) {
        return <div>No exhibitions available (yet)</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Ausstellungen</h1>
                </div>
                {
                    [...exhibitionsMapping.entries()]
                        .sort((a, b) => {
                            return YearToDateTimeOrderingAdapter(dateTimeStrategy, a[0], b[0]);
                        })
                        .map(([year, exhibitions], index) => {
                            return (
                                <Collapsible
                                    key={year}
                                    bottomBorder={true}
                                    clickListenerLocation={ClickListenerLocation.WHOLE_HEADER}
                                    header={
                                        <h1 className={styles.yearTitle}>{year}</h1>
                                    }
                                    initialCollapsed={collapseStrategy(index)}>
                                    <ul className={"my-1"}>
                                        {
                                            exhibitions
                                                .sort((a, b) => {
                                                    return DateToDateTimeOrderingAdapter(dateTimeStrategy, a.startDateObject, b.startDateObject);
                                                })
                                                .map((exhibition) => {

                                                    const isFuture = exhibition.endDateObject.getTime() > today.getTime();
                                                    const isActive = exhibition.endDateObject.getTime() >= today.getTime() && exhibition.startDateObject.getTime() <= today.getTime();

                                                    return (
                                                        <li key={exhibition.id}
                                                            className={"w-full flex-row items-center justify-center h-fit grid-cols-[0fr_minmax(0,_1fr)] grid text-lg"}>
                                                            <div className="timeline-dot-wrapper relative">
                                                                {isActive ? <div className={"timeline-dot animate-ping absolute"}/> : null}
                                                                {isFuture ?
                                                                    <div className="timeline-dot absolute"/> :
                                                                    <div className="timeline-dot absolute opacity-50"/>}
                                                            </div>
                                                            {dateDisplayStrategy(exhibition.startDateObject)}: {exhibition.name} - {exhibition.location}
                                                        </li>
                                                    )
                                                })
                                        }
                                    </ul>
                                </Collapsible>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default ExhibitionDisplay;