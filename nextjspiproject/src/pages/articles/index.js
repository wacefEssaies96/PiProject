import Article from "@/components/article/Article";
import Sidebar from "@/components/article/Sidebar";
import { fetchData } from "@/services/mix";

export default function Index(props) {
    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        {props.articles.map((element, index) => {
                            return (
                                <div key={index} className="col-12 col-lg-6 col-md-6">
                                    <Article key={element._id} article={element}></Article>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <Sidebar categories={props.categories}></Sidebar>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-all`)
    const categories = await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`)
    data.map(element => {
        const myArray = element.createdAt.split("T")
        element.createdAt = myArray[0]
    })
    return {
        props: {
            articles: data,
            categories: categories
        }
    }
}