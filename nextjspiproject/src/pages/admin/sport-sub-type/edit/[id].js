import SportSubTypesForm from "@/components/SportsSubTypesSharedComponents/SubTypeForm"
import { fetchSubTypeData } from "@/services/SportSubTypeServices"

export default function UpdateSportSubType({ sportSubType }) {
    return (
        <div className="container">
            <h1>Update {sportSubType.title}</h1>
            <SportSubTypesForm sportSubType={sportSubType} operation={'Edit'}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const data = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/${context.query.id}`)

    return {
        props : {sportSubType : data}
    }
}