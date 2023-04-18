import Article from "@/components/article/Article";
import { fetchData } from "@/services/mix";

export default function Index(props) {
    return (
        <>
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        {props.articles.map((element, index) => {
                            return (
                                <div class="col-12 col-lg-6 col-md-6">
                                    <Article key={element._id} article={element}></Article>
                                </div>
                            )
                        })}
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="pagination-wrap">
                                <div class="row align-items-center">
                                    <div class="col-12 col-md-12">

                                        <nav class="navigation pagination" aria-label=" ">
                                            <h2 class="screen-reader-text"> </h2>
                                            <div class="nav-links"><span aria-current="page" class="page-numbers current">1</span>
                                                <a class="page-numbers" href="page/2/index.html">2</a>
                                                <a class="next page-numbers" href="page/2/index.html">&raquo;</a>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-4">
                    <div class="sidebar">
                        <div id="search-1" class="widget widget_search">
                            <h4 class="widget-title">Search</h4>
                            <form action="https://slidesigma.com/themes/wp/weefly/" method="get" class="relative">
                                <input type="search" value="" class="form-control" placeholder="Search your keyword..." name="s"
                                    required></input>
                                <button type="submit" class="search_btn"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div id="categories-2" class="widget widget_categories">
                            <h4 class="widget-title">Categories</h4>
                            <ul>
                                {props.categories.map((element, index) => {
                                    return (
                                        <li class="cat-item cat-item-16">
                                            <a href="#">{element.title}</a>
                                        </li>

                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    // TO DO MODIFY URL
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-all`)
    const categories = await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`)
    return {
        props: {
            articles: data,
            categories: categories
        }
    }
}