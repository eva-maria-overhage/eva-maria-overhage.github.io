import {LogoInternalProps} from "@/components/media/logo/Logo.tsx";

export const ArtstationLogo = ({
                                   className
                               }: LogoInternalProps) => {
    return (
        <div className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                 className={"h-full w-full scale-125"}
                 viewBox="0 0 208.8 195.9"
                 xmlSpace="preserve">
                <style type="text/css">
                    {`
                        .st1{fill:#13AFF0;}
                    `}
                </style>
                <g>
                    <path className={"st1"} d="M51.4,123.3l8.9,15.4l0,0c1.8,3.5,5.4,5.9,9.5,5.9l0,0l0,0h59.3l-12.3-21.3H51.4z"/>
                    <path className={"st1"}
                          d="M157.2,123.4c0-2.1-0.6-4.1-1.7-5.8l-34.8-60.4c-1.8-3.4-5.3-5.7-9.4-5.7H92.9l53.7,93l8.5-14.7   C156.7,127,157.2,125.8,157.2,123.4z"/>
                    <polygon className={"st1"} points="108.1,108.1 84.2,66.6 60.2,108.1  "/>
                </g>
            </svg>
        </div>

    )
}