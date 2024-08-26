import { collection, getDocs, query, where, doc, onSnapshot, updateDoc, writeBatch } from "@firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { db, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import { Form } from "react-bootstrap";

import "./Gallery.css"

const Gallery = () => {
    const [images, setImages] = useState()
    const [text, setText] = useState("");
    const [textDisplay, setTextDisplay] = useState("");
    const [topikText, setTopikText] = useState("");
    const [edit, setEdit] = useState(false);
    const { name } = useParams()
    const [docRefId, setDocRefId] = useState("");
    
    const fetchPost = async () => {
        const docRef = collection(db, "gambar")
        const q = query(docRef, where('topic', '==', name))
        
        await getDocs(q)
        .then((querySnapshot) => {
            const data = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id}))
            setImages(data)

            setTopikText(name)
            // console.log(data)
        })
    }

    const updateDesc = async () => {
        const q = query(collection(db, "deskripsi-utama"), where("name", "==", name))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let data = {}
            querySnapshot.forEach((doc) => {
                data = doc.data();
                setDocRefId(doc.id)
                // console.log(data)
            })
            // console.log("unsubcribe called")
            if(data.description == null){
                setText("")
            } else {
                setText(data.description)
                setTextDisplay(data.description);
            }
        })
        // Return the unsubscribe function to clean up the listener
    }

    useEffect(()=>{
        fetchPost()
        updateDesc()
    }, [name])

    const scrollContainerRef = useRef(null);

    useEffect(() => {

        // handle scrolling
        const scrollContainer = scrollContainerRef.current;
        
        if(scrollContainer){
        const handleWheel = (event) => {
            const scrollableElement = scrollContainer;
            // console.log(scrollableElement)

            let add = 0;
            if(event.deltaX != 0){
                add = event.deltaX;
            } else {
                add = event.deltaY;
            }
            scrollableElement.scrollTo({
                left: scrollableElement.scrollLeft + add,
                behavior: "auto"
            })
            // scrollableElement.scrollLeft += event.deltaY;
            event.preventDefault();
        };

        // const newScrollPosition = scrollContainer.scrollLeft + event.deltaY;
        
    
        // Attach the event listener when the component mounts
        scrollContainer.addEventListener('wheel', handleWheel);
    
        // Cleanup the event listener when the component unmounts
        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
        };
        }
    }, scrollContainerRef)
    
    let isAuthenticated = /* Check if the user is authenticated */ false;
    if(auth.currentUser != null){
        isAuthenticated = true;
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const handleChangeTopik = (e) => {
        e.preventDefault()
        setTopikText(e.target.value)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        setEdit(false);
        
        // UPDATE TOPIK
        const topikRef = collection(db, "topik");

        // check mechanism
        const checkQuery = query(topikRef, where("name", "==", topikText));
        const checkSnapshot = await getDocs(checkQuery);

        // If the new topik name already exists, stop the process and show an error
        if (!checkSnapshot.empty && name !== checkSnapshot.docs[0].data().name) {
            console.error("The edited topik name already exists. Process failed.");
            alert("The edited topik name already exists. Please choose a different name.");
            return;
        }

        // update mechanism
        const qTopik = query(topikRef, where("name", "==", name));

        const querySnapshotTopik = await getDocs(qTopik);

        const topikId = querySnapshotTopik.docs[0].id;
        const docRefTopik = doc(db, "topik", topikId)

        await updateDoc(docRefTopik, {
            name: topikText
        })

        

        // UPDATE DESCRIPTION
        const docRef = doc(db, "deskripsi-utama", docRefId);

        await updateDoc(docRef, {
            name: topikText,
            description: text
        })

        // UPDATE ALL IMAGE
        // Query all images with the previous topic name
        const imagesRef = collection(db, "gambar"); // Assuming "images" is your collection name
        const q = query(imagesRef, where("topic", "==", name));

        const querySnapshot = await getDocs(q);

        // Batch update all images with the new topic name
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { topic: topikText });
        });

        await batch.commit();

        window.location.href = `/Web-Photography/gallery/${topikText}`;
    }

    const handleClose = (e) => {
        setEdit(false);
    }

    return (
        <>
        <Modal show={edit} onHide={handleClose}>
        <form className="col" onSubmit={updateDesc}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Topik</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formTopik">
                    <Form.Label>Topic:</Form.Label>

                    <Form.Control type="text" required value={topikText} onChange={handleChangeTopik}/>
                    
                    <Form.Control.Feedback type="invalid">
                        Topic name should not be empty!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formDeskripsi" className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" required value={text} onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please input a title.
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </form>
        </Modal>

        <section className="container align-middle" style={{height: "100%", padding: 0, overflowX: "auto"}} ref={scrollContainerRef}>
            <div className="customRowEd">
                <div className="">
                    <h1>{name}
                    { isAuthenticated &&
                        <Button variant="secondary" onClick={handleEdit} style={{marginLeft: "1rem"}}>
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                    }
                    </h1>
                    <div style={{display: "flex", height: "fit-content", }} >
                        <TextareaAutosize
                        disabled
                        value={textDisplay}
                        onChange={handleChange}
                        style={{overflowY: "hidden"}}
                        />
                    </div>
                </div>

                {
                    images?.map((data, i) => (
                        <div className="" style={{}} key={i}>
                            <Card style={{margin: "0 1 rem"}} key={i}>
                                <Card.Img variant="top" src={data.url} />
                            </Card>
                        </div>
                    ))
                }
            </div>
        </section>
        </>
    )
}

export default Gallery;