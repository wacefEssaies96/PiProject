import Article from "@/components/article/Article";
import { fetchData } from "@/services/mix";
import { Col, Container, Row, Stack } from "react-bootstrap";

export default function Index({ articles }) {
    return (
        <Container >
            <Row>
                {articles.map((element, index) => {
                    return (
                        <Col style={{marginBottom: '20px'}}>
                            <Article key={index} article={element}></Article>
                        </Col>
                    )
                })}
            </Row>
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