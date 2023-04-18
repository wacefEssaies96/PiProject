import {  Suspense,lazy } from 'react'

const CalorieForm = lazy(() => import('@/components/calories/CalorieForm'))

export default function Create() {
    return (
        <Suspense> 
            <CalorieForm></CalorieForm>
        </Suspense>
    )
}