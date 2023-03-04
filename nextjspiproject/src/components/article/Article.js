import { Button, Card } from "react-bootstrap";

export default function Article({ article }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${process.env.backurl}/${article.thumbnail}`} />
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                    {article.description}
                </Card.Text>
                <Button variant="primary">View</Button>
            </Card.Body>
        </Card>
    )
}