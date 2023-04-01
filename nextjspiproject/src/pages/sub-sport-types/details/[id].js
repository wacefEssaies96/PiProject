import { Card } from "react-bootstrap";

export default function Details({ sportSubType }) {
    return (
        <div className="d-flex justify-content-center">
            <Card border="success" style={{ width: '70%' , margin: '2%' , boxShadow: "12px 12px 2px 1px rgba(0, 0, 255, .1)"}}>
                <Card.Header>All {sportSubType?.title} Details</Card.Header>
                <Card.Body>
                    <Card.Title>All {sportSubType?.title} Details</Card.Title>
                    <video width="320" height="240" controls>
                        <source src={`${process.env.backurl}/${sportSubType.demoVideo}`} />
                        Your browser does not support the video tag.
                    </video>
                    <Card.Text>
                        <h3>{sportSubType?.advantages}</h3>
                        <h3>{sportSubType?.limits}</h3>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export const getServerSideProps = async (context) => {

    const res = await fetch(`${process.env.backurl}/api/sportSubTypes/${context.params.id}`);
    const data = await res.json();
    return {
        props: { sportSubType: data }
    }
}