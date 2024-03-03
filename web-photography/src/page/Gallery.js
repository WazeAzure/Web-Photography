import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { db } from "../firebase";

import "./Gallery.css"

const Gallery = () => {
    const [images, setImages] = useState()
    const { name } = useParams()
    
    

    const fetchPost = async () => {
        const docRef = collection(db, "gambar")
        const q = query(docRef, where('topic', '==', name))
        
        await getDocs(q)
        .then((querySnapshot) => {
            const data = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id}))
            setImages(data)
            console.log(data)
        })
    }

    useEffect(()=>{
        fetchPost()
    }, [name])
    

    return (
        <section className="container align-middle" style={{height: "100%"}}>
            <div className="customRowEd" style={{
                height: "100%",
                float: "left",
                whiteSpace: "nowrap"
            }}>
                <div className="" style={{display: "inline-block"}}>
                    <h1>{name}</h1>
                    <p>lorem ipsum dolor actionMeta</p>
                </div>
                {
                    images?.map((data, i) => (
                        <div className="" style={{display: "inline-block"}}>
                            <Card style={{width: "50rem", margin: "0 1 rem"}} key={i}>
                                <Card.Img variant="top" src={data.url} />
                                <Card.Footer style={{margin: 0}}>{data.title}</Card.Footer>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Gallery;