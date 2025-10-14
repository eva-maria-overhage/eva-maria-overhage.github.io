import {type Dispatch, type SetStateAction, useState} from "react";
import styles from "./Collapsible.module.css";
import {cn} from "@/lib/utils.ts";

export interface CollapsibleProps {
    injectedHooks?: [collapsed: boolean, setCollapsed: Dispatch<SetStateAction<boolean>>];
    header: React.ReactNode;
    clickListenerLocation?: ClickListenerLocation;
    children: React.ReactNode;
    className?: string;
    initialCollapsed?: boolean;
    bottomBorder?: boolean;
}

export const ClickListenerLocation = {
    WHOLE_HEADER: "wholeHeader",
    COLLAPSE_ICON: "collapseIcon"
} as const;

export type ClickListenerLocation = typeof ClickListenerLocation[keyof typeof ClickListenerLocation];


const DEFAULT_COLLAPSED = true;
const DEFAULT_BOTTOM_BORDER = true;

export default function Collapsible(
    {
        injectedHooks,
        header,
        clickListenerLocation = ClickListenerLocation.COLLAPSE_ICON,
        children,
        className,
        initialCollapsed,
        bottomBorder
    }: CollapsibleProps) {
    const [internalCollapsed, setInternalCollapsed] = useState((initialCollapsed === undefined) ? DEFAULT_COLLAPSED : initialCollapsed);
    const [showBottomBorder] = useState((bottomBorder === undefined) ? DEFAULT_BOTTOM_BORDER : bottomBorder);

    const collapsed = injectedHooks ? injectedHooks[0] : internalCollapsed;
    const setCollapsed = injectedHooks ? injectedHooks[1] : setInternalCollapsed;


    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    }

    const handleKeyDown = (event: React.KeyboardEvent<SVGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleCollapsed();
        }
    }

    return (
        <div className={className ?? ""}>
            <div className={styles.headerSection}
                 onClick={() => {
                     if (clickListenerLocation === ClickListenerLocation.WHOLE_HEADER) {
                         toggleCollapsed();
                     }
                 }}>
                <div className={styles.headerContent}>
                    {header}
                </div>
                <div className={styles.headerCollapseControl}>
                    <svg
                        role={"button"}
                        aria-label={"Toggle collapsible content"}
                        aria-description={collapsed ? "Expand" : "Collapse"}
                        onClick={() => {
                            if (clickListenerLocation === ClickListenerLocation.COLLAPSE_ICON) {
                                toggleCollapsed();
                            }
                        }}
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className={
                            cn(
                                styles.headerCollapseIcon,
                                collapsed ? "" : styles.iconCollapsed
                            )}
                        viewBox="0 0 100 100"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polyline
                            points={"10 30 50 70 90 30"}
                            fill={"none"}
                            strokeWidth={"10"}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                        />
                    </svg>
                </div>
            </div>
            <div
                className={
                    cn(
                        styles.collapsible,
                        collapsed ? styles.collapsed : ""
                    )}>
                <div
                    aria-label={"Collapsible content"}
                    aria-hidden={collapsed}
                    className={styles.contentWrapper}>
                    {
                        children
                    }
                </div>
            </div>

            {showBottomBorder && (
                <div className={styles.collapsibleMarker}/>)
            }
        </div>
    )
}