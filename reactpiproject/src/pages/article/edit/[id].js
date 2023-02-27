import ArticleForm from "@/components/article/articleform";

export default function EditArticle({ article }) {

    return (
        <div>
            <ArticleForm article={article}></ArticleForm>
        </div>
    )
}

export async function getServerSideProps(context) {
    // Fetching data
    const res = await fetch(`${process.env.backurl}/api/admin/articles/find/${context.query.id}`);
    const data = await res.json();
    return {
        props: {
            article: data
        }
    }
}