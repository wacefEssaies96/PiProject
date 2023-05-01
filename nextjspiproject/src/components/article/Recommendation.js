import React from 'react'
import { Modal, Button } from "react-bootstrap";

export default function Recommendation({ show, handleClose, recommendation, content }) {

    return (
        <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{recommendation.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex' >
                    <div style={{ margin: '0 20px 20px 0' }}>
                        <img style={{ 'float': 'right', width: '200px' }} key={recommendation.picture} src={recommendation.picture} />
                    </div>
                    <div>
                        <h5 key={recommendation.title}>{recommendation.title}</h5>
                        <p key={recommendation.author}>{recommendation.author}</p>
                        <p key={recommendation.time}>{recommendation.time}</p>
                    </div>
                </div>
                <div>
                    {content.map((item, index)=>{
                        return(
                            <p key={index}>{item}</p>
                        )
                    })}
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}