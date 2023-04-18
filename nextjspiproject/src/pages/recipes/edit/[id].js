import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'

const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function EditMeal({ recipe }) {
    return (

        <Suspense>
            <RecipeForm recipe={recipe}></RecipeForm>
        </Suspense>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/recipe/findOne/${context.query.id}`);
    return {
        props: {
            recipe: data
        }
    }
}