import React, { useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot } from "@firebase/firestore";
import { useState } from "react";
import CardPhoto from "./CardPhoto";

const CardView = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "gambar"), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData);
            console.log(newData); // Log the new data, not the state variable 'data'
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    return (
        <section className="d-flex flex-row">
        {
            data?.map((d, i) => (
                <CardPhoto d={d} i={i} key={i}/>
            ))
        }
        </section>
    )
}

export default CardView