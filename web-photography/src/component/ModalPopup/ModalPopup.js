import { useState } from 'react';
import { Timestamp, collection, deleteDoc, doc, getDoc } from "@firebase/firestore";
import { db, storage } from "../../firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ref, deleteObject } from 'firebase/storage';

function ModalPopup({show, setShow, idTarget}) {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (e) => {
      const x = getDoc(doc(db, "gambar", idTarget))
                .then((querySnapshot) => {
                    const tempData = querySnapshot.data()
                    console.log(tempData)
                    const imgRef = ref(storage, tempData.filename)
                    deleteObject(imgRef)
                        .then(() => {
                            console.log("file deleted")
                            const docRef = deleteDoc(doc(db, "gambar", idTarget))
                        }).catch((err) => {
                            console.log(err)
                        }) 
                    
                })
        setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are your sure to delete photo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;