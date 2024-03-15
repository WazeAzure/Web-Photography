import React from 'react';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

import Utilities from '../component/Utilities/Utilities';
import CardView from '../component/CardView/CardView';
import { Row } from 'react-bootstrap';

import { onSnapshot, query, collection, orderBy, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Dashboard = () => {
    const [photoList, setPhotoList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "gambar"), orderBy("date")), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData)
            setPhotoList(newData)
            console.log(newData)
            // console.log(newData); // Log the new data, not the state variable 'data'
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid)
              setIsLoggedIn(true);
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")

              setIsLoggedIn(false)
            }
          });
         
    }, [])

    return (
        <div className="container align-middle" style={{marginTop: "1rem"}}>
            <h1>Web Portfolio Dashboard</h1>
            <hr />
            <Utilities photoList={photoList} setPhotoList={setPhotoList} data={data} setData={setData} />
            <CardView  photoList={photoList} setPhotoList={setPhotoList} data={data} setData={setData} />
        </div>
    )
}

export default Dashboard