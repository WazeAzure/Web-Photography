import { faCross, faDeleteLeft, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card } from "react-bootstrap";


import "./CardPhoto.css"
import { deleteObject, ref } from "@firebase/storage";

const CardPhoto = ({d, i, setModalView, setUpdateModalView, setIdTarget}) => {

    const handleDelete = (e) => {
        setModalView(true);
        const id = e.currentTarget.id
        setIdTarget(id)
    }

    const handleUpdate = (e) => {
        setUpdateModalView(true);
        const id = e.currentTarget.id
        setIdTarget(id);
    }

    return (
        <Card style={{maxWidth: "18rem", margin: "1rem 1rem"}} id={i}>
            <Card.Img variant="top" src={d.url} style={{objectFit: "cover", height: "150px"}} />
            <Card.ImgOverlay>
                <Button variant="secondary" onClick={handleUpdate} id={d.id}>
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