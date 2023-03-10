import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'

const UsersForm = lazy(() => import('@/components/users/UsersForm'))

export default function EditMeal({ user }) {
    return (

        <Suspense>
            <UsersForm user={user}></UsersForm>
        </Suspense>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/users/findOne/${context.query.id}`);
    return {
        props: {
            user: data
        }
    }
}