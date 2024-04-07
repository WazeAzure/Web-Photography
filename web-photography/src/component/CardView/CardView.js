import React, { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { useState } from "react";
import CardPhoto from "./CardPhoto";
import ModalPopup from "../ModalPopup/ModalPopup";
import UpdateModal from "../UpdateModal/UpdateModal";

const CardView = ({photoList, setPhotoList, data, setData}) => {
    const [show, setShow] = useState(false);
    const [idTarget, setIdTarget] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);

    return (
        <div className="d-flex p-2" style={{flexWrap: "wrap"}}>
            <ModalPopup show={show} setShow={setShow} idTarget={idTarget} />
            <UpdateModal show={showUpdate} setShow={setShowUpdate} idTarget={idTarget} />
        {
            photoList?.map((d, i) => (
                <CardPhoto d={d} i={i} key={i} setModalView={setShow} setUpdateModalView={setShowUpdate} setIdTarget={setIdTarget} />
            ))
        }
        </div>
    )
}

export default CardView