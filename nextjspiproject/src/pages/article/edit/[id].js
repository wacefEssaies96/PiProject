import SpinnerLoading from '@/components/article/SpinnerLoading'
import { Suspense, lazy } from 'react'
import { fetchData } from "@/services/article";


export default function EditArticle({ article }) {
    const ArticleForm = lazy(() => import('@/components/article/Articleform'))
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