import AddSportTypesForm from "SportsSharedComponents/AddSportType"

export default function UpdateSportType({ sportType }) {
    return (
        <div className="container">
            <h1>Update {sportType.title}</h1>
            <AddSportTypesForm sportType={sportType}/>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.backurl}/api/sportTypes/${context.query.id}`)
    const data = await res.json()
    return {
        props: {
            sportType: data
        }
    }
}