import {  Suspense,lazy } from 'react'

const UsersForm = lazy(() => import('@/components/users/UsersForm'))

export default function Create() {
    return (
        <Suspense> 
            <UsersForm></UsersForm>
        </Suspense>
    )
}