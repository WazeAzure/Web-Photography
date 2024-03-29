import { faCross, faDeleteLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card } from "react-bootstrap";


import "./CardPhoto.css"
import { deleteObject, ref } from "@firebase/storage";

const CardPhoto = ({d, i, setModalView, setIdTarget}) => {

    const handleDelete = (e) => {
        setModalView(true);
        const id = e.currentTarget.id
        setIdTarget(id)
        // const x = getDoc(doc(db, "gambar", id))
        //     .then((querySnapshot) => {
        //         const tempData = querySnapshot.data()
        //         console.log(tempData)
        //         const imgRef = ref(storage, tempData.filename)
        //         deleteObject(imgRef)
        //             .then(() => {
        //                 console.log("file deleted")
        //                 const docRef = deleteDoc(doc(db, "gambar", id))
        //             }).catch((err) => {
        //                 console.log(err)
        //             }) 
                
        //     })
    }

    return (
        <Card style={{maxWidth: "18rem", margin: "1rem 1rem"}} id={i}>
            <Card.Img variant="top" src={d.url} style={{objectFit: "cover", height: "150px"}} />
            <Card.ImgOverlay>
                <Button variant="secondary">
                    <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button variant="danger" onClick={handleDelete} id={d.id}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Card.ImgOverlay>
            <Card.Body>
                {/* <Card.Title>{d.title}</Card.Title> */}
                <Card.Text>{d.title}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardPhoto