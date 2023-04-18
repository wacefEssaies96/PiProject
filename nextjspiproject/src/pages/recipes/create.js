import {  Suspense,lazy } from 'react'

const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function Create() {
    return (
        <Suspense> 
            <RecipeForm></RecipeForm>
        </Suspense>
    )
}