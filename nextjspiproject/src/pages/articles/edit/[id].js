import SpinnerLoading from '@/components/layouts/PageSpinnerLoading'
import { Suspense, lazy } from 'react'
import { fetchData } from "@/services/mix";
const ArticleForm = lazy(() => import('@/components/article/Articleform'))
const ChatGPT = lazy(() => import('@/components/article/chat/index/ChatGPT'))

export default function EditArticle({ article }) {
    return (
        <div style={{ minHeight: '600px' }}>
            <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
                <ArticleForm article={article}></ArticleForm>
                <ChatGPT></ChatGPT>
            </Suspense>
        </div>
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