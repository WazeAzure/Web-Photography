import React, { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { useState } from "react";
import CardPhoto from "./CardPhoto";

const CardView = ({photoList, setPhotoList}) => {
    

    return (
        <div className="d-flex p-2" style={{flexWrap: "wrap"}}>
        {
            photoList?.map((d, i) => (
                <CardPhoto d={d} i={i} key={i}/>
            ))
        }
        </div>
    )
}

export default CardView