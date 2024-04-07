import { useEffect, useState } from "react";
import {
    Timestamp,
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../../firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ref, deleteObject } from "firebase/storage";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

function UpdateModal({ show, setShow, idTarget }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formTopik, setFormTopik] = useState({value: "", label: ""});
    const [formJudul, setFormJudul] = useState("");
    const [formDeskripsi, setFormDeskripsi] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "topik"), orderBy("name")), (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        let temp = newData.map((data, i) => {
            return {value: data.name, label: data.name, isFixed: true, id: data.id}
        })

            setOptions(temp);
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        if(idTarget != null){
            const x = getDoc(doc(db, "gambar", idTarget)).then((querySnapshot) => {
                const tempData = querySnapshot.data();
    
                setFormJudul(tempData.title);
                console.log(tempData.topic)
                setFormTopik({value: tempData.topic, label: tempData.topic});
            });
        }
    }, [show]);

    const handleUpdate = async (e) => {
        const docRef = doc(db, "gambar", idTarget);

        await updateDoc(docRef, {
            title: formJudul,
            topic: formTopik.value
        })

        setShow(false);
    };

    const handleFormTopik = (val, actionMeta) => {
        if (val != null) {
            setFormTopik(val);
        } else {
            setFormDeskripsi();
        }
        // console.log(e.target.value)
    };
    const handleFormJudul = (e) => {
        setFormJudul(e.target.value);
        // console.log(e.target.value)
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formTopik">
                        <Form.Label>Topik:</Form.Label>
                        <CreatableSelect
                            isClearable
                            options={options}
                            onChange={handleFormTopik}
                            value={formTopik}
                        />

                        <Form.Control.Feedback type="invalid">
                            Please choose a topik.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formJudul" className="mb-3">
                        <Form.Label>Judul:</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={formJudul}
                            onChange={handleFormJudul}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please input a title.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;
