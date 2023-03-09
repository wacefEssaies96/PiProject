import SpinnerLoading from '@/components/layouts/PageSpinnerLoading'
import { Suspense, lazy } from 'react'
const ArticleForm = lazy(() => import('@/components/article/Articleform'))

export default function Create() {
    return (
        <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
            <ArticleForm></ArticleForm>
        </Suspense>
    )
}
