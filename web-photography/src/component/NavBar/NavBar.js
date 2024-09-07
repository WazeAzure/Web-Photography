import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

import { signOut } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";
import HoverComponent from "./HoverComponent";
import ModalNavbar from "../ModalPopup/ModalNavbar";

const NavBar = ({ li }) => {
    const [data, setData] = useState(null)
    const [modalView, setModalView] = useState(false)
    const [idTarget, setIdTarget] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "topik"), orderBy('name')), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData);
            // console.log(newData); // Log the new data, not the state variable 'data'
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    let isAuthenticated = false;

    const [window, setWindow] = useState(true);
    const navigate = useNavigate();
    let openClose = () => {
        if (window === false) {
        setWindow(true);
        } else {
        setWindow(false);
        }
    };

    if(auth.currentUser != null){
        isAuthenticated = true;
    }

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            // console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
            // console.log(error);
        });
    }



    return (
        <nav className={`navbar-menu ${window === false ? 'open' : ''}`} >
            <div className="navbar-menu-container">
                <div className="burger" onClick={() => openClose()}>
                    <div style={{padding: "10px 0 0 0"}}>
                        <h2 style={{fontSize: "1.5rem", fontFamily: "pipebold"}}>AgusHandjojo</h2>
                    </div>
                    <div className="svg-container" style={{width: "40px", marginLeft: "1rem", paddingRight: "5px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 28" width="41" height="28">
                            <g id="side menu">
                            <path id="menu" className="shp0" d="M2.3 3.56L38.68 3.56C39.3 3.56 39.81 3.05 39.81 2.42C39.81 1.79 39.3 1.28 38.68 1.28L2.3 1.28C1.67 1.28 1.16 1.79 1.16 2.42C1.16 3.05 1.67 3.56 2.3 3.56ZM38.68 24.02L2.3 24.02C1.67 24.02 1.16 24.53 1.16 25.16C1.16 25.79 1.67 26.29 2.3 26.29L38.68 26.29C39.3 26.29 39.81 25.79 39.81 25.16C39.81 24.53 39.3 24.02 38.68 24.02ZM38.68 12.65L2.3 12.65C1.67 12.65 1.16 13.16 1.16 13.79C1.16 14.42 1.67 14.93 2.3 14.93L38.68 14.93C39.3 14.93 39.81 14.42 39.81 13.79C39.81 13.16 39.3 12.65 38.68 12.65Z"/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div>
                    <ul className="navbar__list">
                        <ModalNavbar show={modalView} setShow={setModalView} idTarget={idTarget} /> 

                        {/* Dashboard Page */}
                        { isAuthenticated && 
                        <>
                        <div className="navbar__li-box" key="asda">
                            <Link to='/dashboard'>
                                <li
                                className="navbar__li"
                                style={{display: window === false ? "inline-block" : "none"}}
                                >
                                    Dashboard
                                </li>
                            </Link>
                        </div>
                        <div className="navbar__li-box" key={1010}>
                            <li
                            className="navbar__li"
                            style={{ display: window === false ? "inline-block" : "none" }}
                            onClick={handleLogout}
                            >
                                Log Out
                            </li>
                        </div>
                        </>
                        }

                        {/* Log out Navigation */}
                        {
                            !isAuthenticated &&
                            <div className="navbar__li-box" key="asda">
                                <Link to='/login'>
                                    <li
                                    className="navbar__li"
                                    style={{ display: window === false ? "inline-block" : "none" }}
                                    >
                                    Login
                                    </li>
                                </Link>
                            </div>
                        }

                        {/* Shown navigation for static page */}

                        {li.map((item, i) => (
                        <div className="navbar__li-box" key={i}>
                            <Link to={item[2].toLowerCase()}>
                                <li
                                className="navbar__li"
                                style={{ display: window === false ? "inline-block" : "none" }}
                                >
                                {item[0]}
                                </li>
                            </Link>
                        </div>
                        ))}

                        {/* Shown navigation for TOPICS */}

                        {data?.map((item, i) => (
                            <div className="navbar__li-box" key={item.id}>
                                <HoverComponent itemId={item.id} setModalView={setModalView} setIdTarget={setIdTarget} isAuthenticated={isAuthenticated} >
                                <Link to={'/gallery/' + item.name.toLowerCase()}>
                                    <li
                                    className="navbar__li"
                                    style={{ display: window === false ? "inline-block" : "none" }}
                                    >
                                    {item.name}
                                    </li>
                                </Link>
                                </HoverComponent>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
