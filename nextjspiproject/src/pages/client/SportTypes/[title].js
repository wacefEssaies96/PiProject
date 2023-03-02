import { Card } from "react-bootstrap"

export const getServerSideProps = async (context) => {
    const response2 = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${context.query.title}`)
    const data2 = await response2.json()
    return {
        props : { sportTypeByTitle : data2 }
    }
}

const Details = ({sportTypeByTitle}) => {
    return (
            <div className="container">
                <h1>All {sportTypeByTitle.title} Details</h1>
                <div className="d-flex justify-content-around">
                    {sportTypeByTitle.sportSubType.map((subType,index)=>{
                        console.log(subType.demoVideo)
                        return (
                            <Card
                                bg={"info"}
                                key={index}
                                style={{ width: '18rem' }}
                                className="mb-2"
                                >
                                <Card.Header>{ subType.title }</Card.Header>
                                <Card.Body>
                                <Card.Title> Details </Card.Title>
                                <Card.Text>
                                    {subType.demoVideo}
                                    {subType.advantages}
                                    {subType.limits}
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
    );
}
 
export default Details;