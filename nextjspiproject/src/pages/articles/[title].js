import PageSpinnerLoading from "@/components/layouts/PageSpinnerLoading";
import { fetchData } from "@/services/mix";
import { Suspense, lazy } from "react";
import nextCookie from 'next-cookies'

const SingleArticle = lazy(() => import('@/components/article/SingleArticle'))

export default function OneArticle({ article, comments, user }) {

    return (
        <div className="article-container">
            <Suspense fallback={<PageSpinnerLoading></PageSpinnerLoading>}>
                <SingleArticle article={article} comments={comments} user={user}></SingleArticle>
            </Suspense>
        </div>
    )
}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-by-title/${context.query.title}`);
    const comments = await fetchData(`${process.env.backurl}/api/comment/find/${data._id}`)
    const { user } = nextCookie(context)
    return {
        props: {
            article: data,
            comments: comments,
            user: user
        }
    }
}

