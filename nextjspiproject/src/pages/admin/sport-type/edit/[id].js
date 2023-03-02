import SportTypeForm from "@/components/SportsSharedComponents/SportTypeForm"
import { fetchSubTypeData } from "@/services/SportSubTypeServices"

export default function UpdateSportType({ sportType }) {
    return (
        <div className="container">
            <h1>Update {sportType.title}</h1>
            <SportTypeForm sportType={sportType}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const data = await fetchSubTypeData(`${process.env.backurl}/api/sportTypes/${context.query.id}`)

    return {
        props : {sportType : data}
    }
}