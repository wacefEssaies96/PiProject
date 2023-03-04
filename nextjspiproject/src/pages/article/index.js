import Article from "@/components/article/Article";
import { fetchData } from "@/services/mix";
import { Container } from "react-bootstrap";

export default function Index({ articles }) {

    return (
        <Container className="d-flex">
            {articles.map((element, index) => {
                return (
                    <Article key={index} article={element}></Article>
                )
            })}
        </Container>
    )
}

export async function getServerSideProps() {
    // TO DO MODIFY URL
    const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-all`)
    return {
        props: {
            articles: data
        }
    }
}