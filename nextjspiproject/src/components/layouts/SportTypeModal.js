import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MyVerticallyCenteredModal({ show, onHide, title }) {
    const [sportTypeByTitle, setSportTypeByTitle] = useState({
        title:'',
        advantages:[],
        sportSubType:[]
    })
    const [change, setChange] = useState(false)
    const arr1 = sportTypeByTitle.advantages!=[] && sportTypeByTitle.advantages.slice(0, sportTypeByTitle.advantages.length / 2)
    const arr2 = sportTypeByTitle.advantages!=[] && sportTypeByTitle.advantages.slice(sportTypeByTitle.advantages.length / 2)

    useEffect(() => {
        const loadDetails = async () => {
            const response2 = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${title}`)
            const data2 = await response2.json()
            setSportTypeByTitle(data2)
        }
        setChange(true)
        if(change)
            loadDetails()
    }, [change])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {sportTypeByTitle &&
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            All {sportTypeByTitle.title} Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="d-flex justify-content-around">
                                {arr1 && arr1.map((a, i) =>
                                    <div key={i} className='d-flex flex-column'>
                                        <h4>{arr1[i]}</h4>
                                        <p>{arr2[i]}</p>
                                    </div>
                                )}
                                {sportTypeByTitle.sportSubType && sportTypeByTitle.sportSubType.map((sub, i) => {<p key={i}>{sub.title}</p> }
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                </>}
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}