import SpinnerLoading from "@/components/layouts/SpinnerLoading"
import { confirmDelete } from "@/services/alerts"
import { fetchData } from "@/services/mix"
import nextCookie from 'next-cookies'
import Link from "next/link"
import { Suspense, lazy, useState } from "react"
import { Container } from "react-bootstrap"
import { Cookies } from "react-cookie"

const ManageArticlesList = lazy(() => import('@/components/article/ManageArticlesList'))

export default function MyArticles({ articles }) {

    const [list, setList] = useState(articles)

    const refresh = async () => {
        const cookies = new Cookies()
        const response = await fetchData(`${process.env.backurl}/api/admin/articles/find-own-articles/${cookies.get('user')._id}`)
        setList(response.response)
    }
    const deleteOneArticle = async (id) => confirmDelete(`${process.env.backurl}/api/admin/articles/delete/${id}`, refresh)
    return (
        <Container style={{ minHeight: '600px' }}>
            <h1>My Articles</h1>
            <Link className="btn btn-outline-success" href={`/articles/create`}>Create new article</Link>
            <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
                <ManageArticlesList user="user" list={list} deleteOneArticle={deleteOneArticle}></ManageArticlesList>
            </Suspense>

        </Container>
    )
}

export async function getServerSideProps(ctx) {
    const { user } = nextCookie(ctx)
    const response = await fetchData(`${process.env.backurl}/api/admin/articles/find-own-articles/${user._id}`)
    return {
        props: {
            articles: response.response
        }
    }
}