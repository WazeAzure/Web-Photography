import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import { db, storage } from "../../firebase";
import { Timestamp, addDoc, collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";

const ModalForm = () => {
    const [show, setShow] = useState(false);

    const [formGambar, setFormGambar] = useState(null);
    const [formTopik, setFormTopik] = useState("");
    const [formJudul, setFormJudul] = useState("");
    const [formDeskripsi, setFormDeskripsi] = useState('');
    const [downloadUrl, setDownloadUrl] = useState("");

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "topik"), orderBy("name")), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            
            let temp = newData.map((data, i) => {
                // console.log(data)
                return {value: data.name, label: data.name, isFixed: true, id: data.id}
            })
            
            // console.log("HAH HIH")
            // console.log(temp)

            setOptions(temp);
            // console.log(options)
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFormGambar = (e) => {
        setFormGambar(e.target.files[0])
        // console.log(e.target.files[0])
    }
    const handleFormTopik = (val, actionMeta) => {
        if(val != null){
            setFormTopik(val.value)
        } else {
            setFormDeskripsi()
        }
        // console.log(e.target.value)
    }
    const handleFormJudul = (e) => {
        setFormJudul(e.target.value)
        // console.log(e.target.value)
    }
    const handleFormDeskripsi = (e) => {
        setFormDeskripsi(e.target.value)
        // console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // try to upload the image first
        if(formGambar === null){
            // error
            console.log("error")
            return ;
        }

        const imageRef = storageRef(storage, '/' + formGambar.name)

        uploadBytes(imageRef, formGambar)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setDownloadUrl(url)
                        try {
                            // console.log(url)
                            const docRef = addDoc(collection(db, "gambar"), {
                                filename: formGambar.name,
                                topic: formTopik,
                                url: url,
                                description: formDeskripsi,
                                date: Timestamp.now(),
                                title: formJudul
                            })

                            
                            
                            let isExist = false
                            options.forEach((x) => {
                                if (x.value == formTopik){
                                    isExist = true;
                                }
                            })

                            if(!isExist){
                                const docRef2 = addDoc(collection(db, "topik"), {
                                    name: formTopik
                                })

                                const docRef3 = addDoc(collection(db, "deskripsi-utama"), {
                                    name: formTopik,
                                    description: ""
                                })
                            }
                
                            setFormGambar(null)
                            setFormTopik('')
                            setFormJudul('')
                            setFormDeskripsi('')
                        } catch(err) {
                            console.log(err)
                        }
                    })
            })
            .catch((e) => {
                console.log(e)
            })
        
        // console.log("modal submitted")
        setShow(false);
    }

    return (
        <div className="col">
            <Button variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faAdd} className="pr-1"/>
                photos
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form className="col" onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Gambar:</Form.Label>
                            <Form.Control type="file" required onChange={handleFormGambar}/>
                            <Form.Control.Feedback type="invalid">
                                Please upload a file.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formTopik">
                            <Form.Label>Topik:</Form.Label>

                            <CreatableSelect isClearable options={options} onChange={handleFormTopik}/>
                            
                            <Form.Control.Feedback type="invalid">
                                Please choose a topik.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formJudul" className="mb-3">
                            <Form.Label>Judul:</Form.Label>
                            <Form.Control type="text" required value={formJudul} onChange={handleFormJudul}/>
                            <Form.Control.Feedback type="invalid">
                                Please input a title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group controlId="formDeskripsi" className="mb-3">
                            <Form.Label>Deskripsi:</Form.Label>
                            <Form.Control as="textarea" rows={3} required value={formDeskripsi} onChange={handleFormDeskripsi}/>
                            <Form.Control.Feedback type="invalid">
                                Please input a description.
                            </Form.Control.Feedback>
                        </Form.Group> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default ModalForm