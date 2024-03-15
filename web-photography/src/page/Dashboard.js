import React from 'react';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

import Utilities from '../component/Utilities/Utilities';
import CardView from '../component/CardView/CardView';
import { Row } from 'react-bootstrap';

const Dashboard = () => {
    const [photoList, setPhotoList] = useState([]);

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
    console.log(isLoggedIn);

    return (
        <div className="container align-middle" style={{marginTop: "1rem"}}>
            <h1>Web Portfolio Dashboard</h1>
            <hr />
            <Utilities photoList={photoList} setPhotoList={setPhotoList} />
            <CardView  photoList={photoList} setPhotoList={setPhotoList} />
        </div>
    )
}

export default Dashboard