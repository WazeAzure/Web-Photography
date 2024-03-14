import React, { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { useState } from "react";
import CardPhoto from "./CardPhoto";

const CardView = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "gambar"), orderBy("date")), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData);
            // console.log(newData); // Log the new data, not the state variable 'data'
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    return (
        <div className="d-flex p-2" style={{flexWrap: "wrap"}}>
        {
            data?.map((d, i) => (
                <CardPhoto d={d} i={i} key={i}/>
            ))
        }
        </div>
    )
}

export default CardView