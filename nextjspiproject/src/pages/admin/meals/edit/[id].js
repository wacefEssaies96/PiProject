import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'

const MealForm = lazy(() => import('@/components/meals/MealForm'))

export default function EditMeal({ meal }) {
    return (

        <Suspense>
            <MealForm meal={meal}></MealForm>
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