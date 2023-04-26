import {  Suspense,lazy } from 'react'

const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function Create({mealsdb}) {
    return (
        <Suspense> 
            <RecipeForm mealsdb={mealsdb} ></RecipeForm>
        </Suspense>
    )
}
export async function getServerSideProps() {
    
    const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAllValidated`);
  
    return {
        props: {
            mealsdb : mealsdb
        }
    }
}