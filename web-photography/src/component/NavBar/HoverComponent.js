import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const HoverComponent = ({children, itemId, setModalView, setIdTarget}) => {
    const [show, setShow] = useState(false);

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
        <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            { show && (
                <Button variant="danger" onClick={handleDelete} id={itemId} style={{marginLeft: "1rem"}} >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            )}
        </div>
    )
}

export default HoverComponent;