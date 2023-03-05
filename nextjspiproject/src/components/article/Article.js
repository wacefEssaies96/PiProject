import { Button, Card } from "react-bootstrap";

export default function Article({ article }) {
    return (
        <Card style={{ width: '18rem', height : '22rem' }}>
            <Card.Img style={{ height: '15rem' }} variant="top" src={`${process.env.backurl}/${article.thumbnail}`} />
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                    {article.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}