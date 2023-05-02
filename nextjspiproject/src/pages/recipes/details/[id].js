import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'


const RecipeDetails = lazy(() => import('@/components/recipes/RecipeDetails'))

export default function RecipeDetail({ recipe }) {
    return (

        <Suspense>
            <RecipeDetails recipe={recipe} ></RecipeDetails>
        </Suspense>
    )
}

export async function getServerSideProps(context) {

    const recipe = await fetchData(`${process.env.backurl}/api/recipe/findOne/${context.query.id}`);


    return {
        props: {
            recipe,
        }
    }
}