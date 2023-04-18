import SpinnerLoading from '@/components/layouts/PageSpinnerLoading'
import { Suspense, lazy } from 'react'
const ArticleForm = lazy(() => import('@/components/article/Articleform'))
const ChatGPT = lazy(() => import('@/components/article/chat/index/ChatGPT'))

export default function Create() {
    return (
        <div style={{ minHeight: '600px' }}>
            <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
                <ArticleForm></ArticleForm>
                <ChatGPT></ChatGPT>
            </Suspense>
        </div>
    )
}

