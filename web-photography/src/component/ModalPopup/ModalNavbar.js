import { useState } from 'react';
import { Timestamp, collection, deleteDoc, doc, getDoc } from "@firebase/firestore";
import { db, storage } from "../../firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ref, deleteObject } from 'firebase/storage';

function ModalNavbar({show, setShow, idTarget}) {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (e) => {
    const x = deleteDoc(doc(db, "topik", idTarget));
    setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are your sure to delete topic?<br />When you delete topic, your photos will still remain</Modal.Body>
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

export default ModalNavbar;