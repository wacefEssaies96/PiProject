import EventCalendarForm from "@/components/EventCalendarForm"
import { fetchSubTypeData } from "@/services/SportSubTypeServices"
import { useRouter } from "next/router";

export default function UpdateEvent({ Event }) {
    const router = useRouter();
    const { userEmail } = router.query;
    console.log(userEmail);
    return (
        <div className="container">
            <h1>Update {Event.summary}</h1>
            <EventCalendarForm email={userEmail} Event={Event} operation={'Edit'}/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const data = await fetchSubTypeData(`${process.env.backurl}/api/eventCalendarSport/${context.query.id}`)

    return {
        props : {Event : data}
    }
}