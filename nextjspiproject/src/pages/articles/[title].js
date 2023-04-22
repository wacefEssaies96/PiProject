import Sidebar from "@/components/article/Sidebar";
import SingleArticle from "@/components/article/SingleArticle";
import { fetchData } from "@/services/mix";

export default function OneArticle({ article, categories }) {

    return (
        <div className="article-container">
            <SingleArticle article={article}></SingleArticle>
            <Sidebar categories={categories}></Sidebar>
        </div>
    )

}

export async function getServerSideProps(context) {
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-by-title/${context.query.title}`);
    const categories = await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`)

    return {
        props: {
            article: data,
            categories: categories
        }
    }
}

