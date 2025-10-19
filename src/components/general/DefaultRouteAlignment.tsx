export interface DefaultRouteAlignmentProps {
    children: React.ReactNode;
}

const DefaultRouteAlignment = (
    {
        children
    }: DefaultRouteAlignmentProps
) => {
    return (
        <div className={"w-full h-full flex justify-center align-center"}>
            <div className={"lg:mx-12 mx-4 my-3 w-full"}>
                {children}
            </div>
        </div>
    )
}

export default DefaultRouteAlignment;