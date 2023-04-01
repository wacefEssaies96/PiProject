import { Card } from "react-bootstrap"

const Details = ({ sportTypeByTitle }) => {
    
    const arr1 = sportTypeByTitle.advantages.slice(0, sportTypeByTitle.advantages.length / 2)
    const arr2 = sportTypeByTitle.advantages.slice(sportTypeByTitle.advantages.length / 2)

    return (
        <div className="container">
            <h1>All {sportTypeByTitle.title} Details</h1>
            <div className="d-flex justify-content-around">
                <Card bg={"ligth"} className="mb-2">
                    <Card.Header> {sportTypeByTitle.title} </Card.Header>
                    <Card.Body>
                        <Card.Title>Details</Card.Title>
                        <Card.Text>
                            {sportTypeByTitle.advantages && arr1.map((a, i) =>
                                <div key={i}>
                                    <h4>{arr1[i]}</h4>
                                    <p>{arr2[i]}</p>
                                </div>
                            )}
                        </Card.Text>
                        <Card.Text>
                            {sportTypeByTitle.sportSubType && sportTypeByTitle.sportSubType.map((sub, i) => { sub != null && <p key={i}>{sub.title}</p> }
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const response2 = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${context.query.title}`)
    const data2 = await response2.json()
    return {
        props: { sportTypeByTitle: data2 }
    }
}

export default Details;