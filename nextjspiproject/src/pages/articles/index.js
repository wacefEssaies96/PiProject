import PageSpinnerLoading from "@/components/layouts/PageSpinnerLoading";
import SpinnerLoading from "@/components/layouts/SpinnerLoading";
import { fetchData } from "@/services/mix";
import axios from "axios";
import { Suspense, lazy, useState } from "react";

const Article = lazy(() => import('@/components/article/Article'))
const Sidebar = lazy(() => import('@/components/article/Sidebar'))

export default function Index(props) {
    const [articles, setArticles] = useState(props.articles)
    const [currentPage, setCurrentPage] = useState(props.currentPage)
    const [totalPages, setTotalPages] = useState(props.totalPages)
    const [query, setQuery] = useState('')

    const handleSearch = async (query) => {
        setCurrentPage(1)
        try {
            const response = await axios.get(`${process.env.backurl}/api/admin/articles/search`, {
                params: {
                    query,
                    page: 1
                }
            })
            setArticles(response.data.docs)
            setTotalPages(response.data.totalPages)

        } catch (err) {
            console.error(err)
        }
    }

    const handlePageChange = async (page) => {
        try {
            const response = await axios.get(`${process.env.backurl}/api/admin/articles/search`, {
                params: {
                    query,
                    page
                }
            })

            setArticles(response.data.docs)
            setCurrentPage(page)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        {articles.map((element, index) => {
                            return (
                                <div key={index} className="col-12 col-lg-6 col-md-6">
                                    <Suspense fallback={<PageSpinnerLoading></PageSpinnerLoading>}>
                                        <Article key={element._id} article={element}></Article>
                                    </Suspense>
                                </div>
                            )
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="pagination-wrap">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-12">
                                        <nav className="navigation pagination" aria-label=" ">
                                            <h2 className="screen-reader-text"> </h2>
                                            <div className="nav-links">

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                    currentPage == page
                                                        ? <span key={page} aria-current="page" className="page-numbers current">{currentPage}</span>
                                                        : <a href="#" className="page-numbers" key={page} onClick={() => handlePageChange(page)}>
                                                            {page}
                                                        </a>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
                    <Sidebar query={query} setQuery={setQuery} handleSearch={handleSearch} categories={props.categories}></Sidebar>
                </Suspense>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const categories = await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`)
    try {
        const response = await axios.get(`${process.env.backurl}/api/admin/articles/search`, {
            params: {
                query: '',
                page: 1
            }
        })
        return {
            props: {
                articles: response.data.docs,
                totalPages: response.data.totalPages,
                currentPage: response.data.page,
                categories: categories
            }
        }
    } catch (err) {
        return {
            props: {
                articles: [],
                categories: categories
            }
        }
    }
}