import {Exhibition} from "../../../../types/data/Exhibition.ts";
import exhibitions from "@/data/Exhibitions.json";
import Collapsible, {ClickListenerLocation} from "../../general/collapsible/Collapsible.tsx";
import {
    DateTimeOrderingStrategy, DateToDateTimeOrderingAdapter, DescendingDateTimeStrategy,
    FirstOpenStrategy,
    InitialCollapsedStrategy, YearToDateTimeOrderingAdapter,
    DateDisplayStrategy, DisplayStartMonthLongStrategy,

} from "./ExhibitionDisplay.config.ts";
import {ID} from "../../../../types/data/Shared.ts";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export interface ExhibitionDisplayProps {
    collapseStrategy?: InitialCollapsedStrategy;
    dateTimeStrategy?: DateTimeOrderingStrategy;
    dateDisplayStrategy?: DateDisplayStrategy;
}

enum ExhibitionStatus {
    UPCOMING = "upcoming",
    ACTIVE = "active",
    PAST = "past"
}

type StatusInfo =
    | { type: ExhibitionStatus.UPCOMING, daysUntil: number }
    | { type: ExhibitionStatus.ACTIVE, remainingDays: number }
    | { type: ExhibitionStatus.PAST };

interface InternalExhibitionData extends Exhibition {
    id: ID<Exhibition>;
    startDateObject: Date;
    endDateObject: Date;
    status: StatusInfo;
}

const dataToInternalMapping = (exhibitions: Record<ID<Exhibition>, Exhibition>): Map<string, InternalExhibitionData[]> => {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return Object.entries(exhibitions).map(([id, exhibition]) => {
        const startDateObject = new Date(exhibition.startDate);
        const endDateObject = new Date(exhibition.endDate ?? exhibition.startDate);

        let status: StatusInfo;

        if (startDateObject > todayMidnight) {
            const daysUntil = Math.ceil((startDateObject.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24));
            status = {type: ExhibitionStatus.UPCOMING, daysUntil};
        } else if (endDateObject < todayMidnight) {
            status = {type: ExhibitionStatus.PAST};
        } else {
            const remainingDays = Math.ceil((endDateObject.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24));
            status = {type: ExhibitionStatus.ACTIVE, remainingDays};
        }

        return {
            ...exhibition,
            id,
            startDateObject,
            endDateObject,
            status
        };
    }).reduce((map, exhibition) => {
        const year = exhibition.startDateObject.getFullYear().toString();
        if (!map.has(year)) map.set(year, []);
        map.get(year)!.push(exhibition);
        return map;
    }, new Map<string, InternalExhibitionData[]>());
};


const renderStatusIndicator = (exhibition: InternalExhibitionData) => {
    const status = exhibition.status;
    switch (status.type) {
        case ExhibitionStatus.PAST:
            return <div className={"timeline-dot-wrapper relative"}>
                <div className="timeline-dot absolute opacity-50"/>
            </div>;
        case ExhibitionStatus.ACTIVE: {
            //TODO: Maybe date-fns for localization & timestamp handling

            const daysRemaining = status.remainingDays;

            const ttText = daysRemaining === 1 ? "Nur noch heute!" : `Noch ${daysRemaining} Tage zu sehen`;

            return (
                <Tooltip>
                    <TooltipTrigger>
                        <div className={"timeline-dot-wrapper relative"}>
                            <div className={"timeline-dot animate-ping absolute"}/>
                            <div className="timeline-dot absolute"/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {ttText}
                    </TooltipContent>
                </Tooltip>
            );
        }
        case ExhibitionStatus.UPCOMING: {
            return <div className={"timeline-dot-wrapper relative"}>
                <div className="timeline-dot absolute"/>
            </div>;
        }
    }
}

const ExhibitionDisplay = (
    {
        collapseStrategy = FirstOpenStrategy,
        dateTimeStrategy = DescendingDateTimeStrategy,
        dateDisplayStrategy = DisplayStartMonthLongStrategy
    }: ExhibitionDisplayProps
) => {

    const exhibitionsMapping = dataToInternalMapping(exhibitions);

    if (exhibitionsMapping.size === 0) {
        return <div>No exhibitions available (yet)</div>;
    }

    return (
        <div className={"w-full flex items-center justify-center"}>
            <div className={"w-full"}>
                <div className={"text-3xl font-bold mb-4 hidden lg:block"}>
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
                                        <h1 className={"text-2xl"}>{year}</h1>
                                    }
                                    initialCollapsed={collapseStrategy(index)}>
                                    <ul className={"my-1"}>
                                        {
                                            exhibitions
                                                .sort((a, b) => {
                                                    return DateToDateTimeOrderingAdapter(dateTimeStrategy, a.startDateObject, b.startDateObject);
                                                })
                                                .map((exhibition) => {
                                                    return (
                                                        <li key={exhibition.id}>
                                                            <div
                                                                className={"w-full flex-row items-center justify-center h-fit grid-cols-[0fr_minmax(0,_1fr)] grid text-lg"}>
                                                                {renderStatusIndicator(exhibition)}
                                                                <p>{dateDisplayStrategy(exhibition.startDateObject)}: {exhibition.name} - {exhibition.location}</p>
                                                            </div>
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