import SpinnerLoading from '@/components/layouts/PageSpinnerLoading'
import { Suspense, lazy } from 'react'
import { fetchData } from "@/services/mix";
const ArticleForm = lazy(() => import('@/components/article/Articleform'))

export default function EditArticle({ article }) {
    return (
        <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
            <ArticleForm article={article}></ArticleForm>
        </Suspense>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find/${context.query.id}`);
    return {
        props: {
            article: data
        }
    }
}