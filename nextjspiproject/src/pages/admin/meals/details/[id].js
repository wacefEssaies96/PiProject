import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'

const MealDetails = lazy(() => import('@/components/meals/MealDetails'))

export default function MealDetail({ meal }) {
    return (

        <Suspense>
            <MealDetails meal={meal}></MealDetails>
        </Suspense>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/meal/findOne/${context.query.id}`);
    return {
        props: {
            meal: data
        }
    }
}