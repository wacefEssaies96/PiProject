import SportSubTypesForm from "@/SubTypes/SubTypeForm"
import {fetchSubTypeData} from '../../../../SportsSharedComponents/SportServices/SportSubTypeServices'

export default function UpdateSportSubType({ sportSubType }) {
    return (
        <div className="container">
            <h1>Update {sportSubType.title}</h1>
            <SportSubTypesForm sportSubType={sportSubType}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const data = await fetchSubTypeData(`${process.env.backurl}/api/sportSubTypes/${context.query.id}`)

    return {
        props : {sportSubType : data}
    }
}