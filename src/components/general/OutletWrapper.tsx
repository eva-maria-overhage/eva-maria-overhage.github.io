const OutletWrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <div className={"fade-in"}>
                {children}
            </div>
        </div>
    );
}

export default OutletWrapper;