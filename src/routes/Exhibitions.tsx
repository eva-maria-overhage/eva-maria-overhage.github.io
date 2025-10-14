import ExhibitionDisplay from "../components/dataDisplay/exhibitions/ExhibitionDisplay.tsx";
export const loader = async () => {
    return;
};


const Exhibitions = () => {
    return (
        <div className={"w-full h-full flex justify-center align-center"}>
            <div className={"mx-12 my-3 w-full"}>
                <ExhibitionDisplay/>
            </div>
        </div>
    )
}

export default Exhibitions;