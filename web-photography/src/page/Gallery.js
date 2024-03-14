import { collection, getDocs, query, where, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { db, auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';

import "./Gallery.css"

const Gallery = () => {
    const [images, setImages] = useState()
    const [text, setText] = useState("");
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
                console.log(data)
            })
            console.log("unsubcribe called")
            if(data.description == null){
                setText("")
            } else {
                setText(data.description)
            }
        })
        // Return the unsubscribe function to clean up the listener
    }

    useEffect(()=>{
        fetchPost()
        updateDesc()
    }, [name])
    
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

    const handleSave = async (e) => {
        setEdit(false);

        const docRef = doc(db, "deskripsi-utama", docRefId);

        await updateDoc(docRef, {
            description: text
        })
    }

    return (
        <section className="container align-middle" style={{height: "100%"}}>
            <div className="customRowEd" style={{
                height: "100%",
                float: "left",
                whiteSpace: "nowrap"
            }}>
                <div className="" style={{width: "20rem"}}>
                    <h1>{name}
                    { isAuthenticated &&
                        <Button variant="secondary" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                    }
                    </h1>
                    {
                        edit==false ? 
                        (
                        <div style={{display: "flex", height: "fit-content", }} >
                            <TextareaAutosize
                            disabled
                            value={text}
                            onChange={handleChange}
                            style={{overflowY: "hidden"}}
                            />
                        </div>)
                        :
                        (
                        <>
                        <div>
                            <TextareaAutosize
                            value={text} 
                            onChange={handleChange}
                            style={{overflowY: "hidden"}}
                            />
                        </div>
                        <Button variant="secondary" onClick={handleSave} style={{marginTop: "2rem"}}>
                            SAVE  <FontAwesomeIcon icon={faSave} />
                        </Button>
                        </>
                        )
                    }
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
    )
}

export default Gallery;