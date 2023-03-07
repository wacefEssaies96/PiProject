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


import React from 'react'
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(type, id) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteConfirmation;