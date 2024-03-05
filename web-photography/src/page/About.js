import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { auth, db } from "../firebase";
import { Form } from "react-bootstrap";
import { doc, getDoc, where, onSnapshot, updateDoc } from "firebase/firestore";
import TextareaAutosize from 'react-textarea-autosize';

import "./About.css"


const About = () => {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");

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

        const docRef = doc(db, "deskripsi-utama", "1xDoBY0emVWRs39GZCsP");

        await updateDoc(docRef, {
            description: text
        })
    }


    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "deskripsi-utama", "1xDoBY0emVWRs39GZCsP"), { includeMetadataChanges: true},
        (doc) => {
            const data = doc.data()
            setText(data.description)
        })
        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    return (
        <div className="container align-middle" style={{marginTop: "1rem"}}>
            <h1 style={{marginBottom: "2rem"}}><span style={{marginRight: "1rem"}}>About</span>
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
    )
}

export default About