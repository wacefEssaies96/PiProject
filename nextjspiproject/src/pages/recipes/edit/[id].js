import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react'

const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function EditMeal({ recipe,mealsdb }) {
    return (

        <Suspense>
            <RecipeForm recipe={recipe} mealsdb={mealsdb}  ></RecipeForm>
        </Suspense>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/recipe/findOne/${context.query.id}`);
    
    const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAllValidated`);
  
    return {
        props: {
            recipe: data,
            mealsdb : mealsdb
        }
    }
}