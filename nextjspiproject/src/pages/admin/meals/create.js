import {  Suspense,lazy } from 'react'

const MealsForm = lazy(() => import('@/components/meals/MealForm'))

export default function Create() {
    return (
        <Suspense> 
            <MealsForm></MealsForm>
        </Suspense>
    )
}