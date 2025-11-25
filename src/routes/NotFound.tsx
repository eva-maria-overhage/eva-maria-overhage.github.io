const NotFound = () => {
    return (
        <div className={"h-dvh w-dvw flex justify-center items-center flex-col"}>
            <p className={"text-6xl"}>404</p>
            <p className={"text-4xl"}>Seite nicht gefunden</p>
            <p className={"text-xl mt-4 text-center"}>Die von Ihnen angeforderte Seite existiert nicht oder wurde entfernt. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.</p>
        </div>
    )
}

export default NotFound;