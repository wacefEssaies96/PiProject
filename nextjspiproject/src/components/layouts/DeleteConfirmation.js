// import React, { useEffect, useState } from 'react'

// function Modal({confirmDeleting, closeModal, id}) {

//     const [modalShow, setModalShow] = useState(closeModal)

//     const closeModalbtn = () => {
//         setModalShow(!modalShow)
//     }

//     useEffect(()=>{
//         setModalShow(modalShow)
//     })

//     const deleteST = (id) => {
//         confirmDeleting(id)
//     }

//     return (
//         <div className="modalBackground" hidden={modalShow}>
//             <div className="modalContainer">
//                 <div className="titleCloseBtn">
//                     <button onClick={closeModalbtn}>X</button>
//                 </div>
//                 <div className="title">
//                     <h1>Are You Sure You Want to delete this Sport Type?</h1>
//                 </div>
//                 {/* <div className="body">
//                     <p>The next page looks amazing. Hope you want to go there!</p>
//                 </div> */}
//                 <div className="footer">
//                     <button onClick={closeModalbtn}>Cancel</button>
//                     <button onClick={()=>deleteST(id)} id="cancelBtn">Continue</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Modal


import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Modal, Button, Form, Stack } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {

  const [email, setEmail] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      await fetch(`${process.env.backurl}/api/send-reset-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      })
      console.log('an email is sent to you ! check it please')
      router.push("/resetPassword")
    }
  }
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        {!id==null ? <Modal.Title>Delete Confirmation</Modal.Title> : <Modal.Title>Reset Password</Modal.Title>}
      </Modal.Header>
      {!id==null ? <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body> : 
      <Modal.Body>
        <div className="alert alert-success">{message}</div>
        {/* <Form onSubmit={handleSubmit}> */}
        <Stack gap={4}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control placeholder="name@example.com" type="text" id="email" name="email" required onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
        </Stack>
      {/* </Form> */}
      </Modal.Body>}
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        {!id==null ? <Button variant="danger" onClick={() => confirmModal(type, id)}>
          Delete
        </Button> :
        <Button variant="success" type="submit" onClick={handleSubmit}>Submit</Button> 
        }
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation;