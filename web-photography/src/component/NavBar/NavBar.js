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
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
            console.log(error);
        });
    }



    return (
        <nav className="navbar-menu" style={{ width: window === false ? 250 : 60 }}>
        <div className="burger" onClick={() => openClose()}>
        <div style={{padding: "25px 0 0 0", color: "blue"}}>
        <svg width="170" height="20" viewBox="0 0 536 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M521.116 20.6062L521.116 20.6062L521.121 20.6161C522.261 22.9602 522.892 25.964 522.892 29.7273C522.892 33.4905 522.261 36.4944 521.121 38.8384L521.116 38.8484C519.959 41.2555 518.446 42.9656 516.616 44.1049L516.61 44.1089C514.756 45.2708 512.675 45.8636 510.301 45.8636C507.929 45.8636 505.839 45.2715 503.967 44.1071C502.15 42.9678 500.635 41.2554 499.461 38.8433C498.334 36.4973 497.71 33.4913 497.71 29.7273C497.71 25.9632 498.334 22.9572 499.461 20.6111C500.635 18.1992 502.15 16.487 503.966 15.3476C505.838 14.1831 507.929 13.5909 510.301 13.5909C512.675 13.5909 514.756 14.1837 516.61 15.3457L516.616 15.3496C518.446 16.4889 519.959 18.1991 521.116 20.6062ZM530.427 43.565C532.406 39.5738 533.347 34.9346 533.347 29.7273C533.347 24.5199 532.406 19.8807 530.427 15.8896C528.469 11.9405 525.739 8.81697 522.221 6.60961C518.697 4.39853 514.698 3.31818 510.301 3.31818C505.904 3.31818 501.905 4.39853 498.381 6.60961C494.863 8.81697 492.133 11.9405 490.175 15.8896C488.196 19.8808 487.256 24.5199 487.256 29.7273C487.256 34.9346 488.196 39.5738 490.175 43.565C492.133 47.514 494.863 50.6376 498.381 52.8449C501.905 55.056 505.904 56.1364 510.301 56.1364C514.698 56.1364 518.697 55.056 522.221 52.8449C525.739 50.6376 528.469 47.514 530.427 43.565Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M474.642 3.95453H472.142V6.45453V39.7273C472.142 41.4016 471.877 42.6557 471.457 43.5791L471.457 43.5791L471.452 43.591C471.05 44.4866 470.514 45.075 469.856 45.4699C469.186 45.8716 468.275 46.1363 467.006 46.1363C465.849 46.1363 464.913 45.9232 464.144 45.5588C463.365 45.1901 462.815 44.716 462.42 44.1479C462.077 43.6219 461.869 42.9675 461.869 42.0909V39.5909H459.369H453.824H451.324V42.0909C451.324 44.8826 451.996 47.43 453.44 49.624C454.844 51.7584 456.768 53.3868 459.141 54.5097L459.148 54.513L459.155 54.5163C461.52 55.6176 464.154 56.1363 467.006 56.1363C470.038 56.1363 472.804 55.5298 475.22 54.2206C477.657 52.8993 479.543 50.9549 480.855 48.4585C482.178 45.9411 482.778 42.9968 482.778 39.7273V6.45453V3.95453H480.278H474.642Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M437.616 20.6062L437.616 20.6062L437.621 20.6161C438.761 22.9602 439.392 25.964 439.392 29.7273C439.392 33.4905 438.761 36.4944 437.621 38.8384L437.616 38.8484C436.459 41.2555 434.946 42.9656 433.116 44.1049L433.11 44.1089C431.256 45.2708 429.175 45.8636 426.801 45.8636C424.429 45.8636 422.339 45.2715 420.467 44.1071C418.65 42.9678 417.135 41.2554 415.961 38.8433C414.834 36.4973 414.21 33.4913 414.21 29.7273C414.21 25.9632 414.834 22.9572 415.961 20.6111C417.135 18.1992 418.65 16.487 420.466 15.3476C422.338 14.1831 424.429 13.5909 426.801 13.5909C429.175 13.5909 431.256 14.1837 433.11 15.3457L433.116 15.3496C434.946 16.4889 436.459 18.1991 437.616 20.6062ZM446.927 43.565C448.906 39.5738 449.847 34.9346 449.847 29.7273C449.847 24.5199 448.906 19.8808 446.927 15.8896C444.97 11.9405 442.239 8.81698 438.721 6.60961C435.197 4.39853 431.198 3.31818 426.801 3.31818C422.404 3.31818 418.405 4.39853 414.881 6.60961C411.363 8.81697 408.633 11.9405 406.675 15.8896C404.696 19.8808 403.756 24.5199 403.756 29.7273C403.756 34.9346 404.696 39.5738 406.675 43.565C408.633 47.514 411.363 50.6376 414.881 52.8449C418.405 55.056 422.404 56.1364 426.801 56.1364C431.198 56.1364 435.197 55.056 438.721 52.8449C442.239 50.6376 444.97 47.514 446.927 43.565Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M391.142 3.95453H388.642V6.45453V39.7273C388.642 41.4016 388.377 42.6557 387.957 43.5791L387.957 43.5791L387.952 43.591C387.55 44.4866 387.014 45.075 386.356 45.4699C385.686 45.8716 384.775 46.1363 383.506 46.1363C382.349 46.1363 381.413 45.9232 380.644 45.5588C379.865 45.1901 379.315 44.716 378.92 44.1479C378.577 43.6219 378.369 42.9675 378.369 42.0909V39.5909H375.869H370.324H367.824V42.0909C367.824 44.8826 368.496 47.43 369.94 49.624C371.344 51.7584 373.268 53.3868 375.641 54.5097L375.648 54.513L375.655 54.5163C378.02 55.6176 380.654 56.1363 383.506 56.1363C386.538 56.1363 389.304 55.5298 391.72 54.2206C394.157 52.8993 396.043 50.9549 397.355 48.4585C398.678 45.9411 399.278 42.9968 399.278 39.7273V6.45453V3.95453H396.778H391.142Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M324.824 53V55.5H327.324H341.687C346.74 55.5 351.202 54.5031 354.961 52.3819L354.969 52.3776C358.716 50.2464 361.575 47.1894 363.518 43.2693L363.52 43.2654C365.453 39.3482 366.369 34.7776 366.369 29.6363C366.369 24.5283 365.462 19.9944 363.543 16.1202C361.622 12.2286 358.824 9.19192 355.165 7.08529C351.498 4.95891 347.183 3.95453 342.324 3.95453H327.324H324.824V6.45453V53ZM354.294 20.9577L354.296 20.9625C355.344 23.2776 355.915 26.144 355.915 29.6363C355.915 33.1574 355.337 36.0541 354.274 38.4001C353.239 40.6854 351.699 42.4003 349.627 43.6166C347.582 44.8165 344.862 45.5 341.324 45.5H335.46V13.9545H341.96C345.266 13.9545 347.828 14.622 349.784 15.8005L349.784 15.8005L349.793 15.8063C351.768 16.984 353.265 18.6716 354.294 20.9577Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M318.545 6.45453V3.95453H316.045H310.5H308V6.45453V35.7654L286.644 5.02806L285.898 3.95453H284.591H279.136H276.636V6.45453V53V55.5H279.136H284.773H287.273V53V23.7865L308.537 54.4254L309.283 55.5H310.591H316.045H318.545V53V6.45453Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M237.795 55.5H239.561L240.151 53.8363L244.24 42.3182H259.532L263.621 53.8363L264.212 55.5H265.977H271.886H275.467L274.233 52.1383L257.142 5.59282L256.541 3.95453H254.795H248.977H247.232L246.63 5.59281L229.539 52.1383L228.305 55.5H231.886H237.795ZM251.886 20.779L255.982 32.3182H247.79L251.886 20.779Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M186.011 53V55.5H188.511H194.148H196.648V53V34.6818H216.466V53V55.5H218.966H224.602H227.102V53V6.45453V3.95453H224.602H218.966H216.466V6.45453V24.6818H196.648V6.45453V3.95453H194.148H188.511H186.011V6.45453V53Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M170.671 18.3849L170.932 20.5909H173.153H178.608H181.19L181.107 18.0103C181.015 15.1635 180.122 12.5712 178.434 10.3061C176.791 8.08063 174.592 6.37368 171.921 5.15871C169.211 3.91023 166.179 3.31818 162.881 3.31818C159.6 3.31818 156.554 3.92197 153.785 5.17564C151.03 6.41389 148.766 8.19311 147.065 10.5277L147.063 10.5305C145.316 12.9347 144.472 15.7327 144.472 18.8182C144.472 22.5849 145.777 25.8177 148.466 28.2769C150.948 30.5454 154.205 32.1921 158.099 33.3118L158.103 33.3129L163.83 34.9493L163.839 34.9518L163.848 34.9542C165.387 35.3818 166.802 35.8759 168.097 36.4329C169.231 36.9205 170.047 37.5111 170.627 38.1627C171.008 38.5904 171.29 39.2174 171.29 40.2727C171.29 41.436 170.962 42.3685 170.328 43.1771C169.631 44.0514 168.645 44.7967 167.27 45.3699C165.904 45.9245 164.303 46.2273 162.426 46.2273C160.832 46.2273 159.383 45.9935 158.062 45.5466C156.833 45.1116 155.881 44.4833 155.142 43.6842C154.529 42.9933 154.119 42.0756 154.008 40.7853L153.811 38.5H151.517H145.699H143.014L143.205 41.1781C143.417 44.1467 144.339 46.8319 146.008 49.1607L146.008 49.1607L146.015 49.1712C147.697 51.4928 149.974 53.2563 152.753 54.4897L152.758 54.492C155.584 55.7383 158.83 56.3182 162.426 56.3182C166.269 56.3182 169.696 55.6763 172.615 54.2796C175.482 52.9149 177.776 51.015 179.367 48.5377C180.957 46.0871 181.744 43.3399 181.744 40.3636C181.744 37.8426 181.227 35.5338 180.051 33.5611L177.903 34.8409L180.051 33.561C178.984 31.7713 177.61 30.2781 175.931 29.1128C174.403 28.0278 172.785 27.1616 171.078 26.5234C169.537 25.9416 168.108 25.4741 166.796 25.1294L162.076 23.8587L162.069 23.8568L162.062 23.855C161.282 23.6496 160.406 23.3775 159.433 23.0345C158.568 22.7153 157.741 22.3146 156.95 21.8309C156.3 21.42 155.787 20.9281 155.386 20.3524C155.113 19.9314 154.926 19.3653 154.926 18.5454C154.926 17.5762 155.191 16.771 155.715 16.0471C156.28 15.2869 157.101 14.628 158.284 14.1119C159.454 13.6079 160.906 13.3182 162.699 13.3182C165.135 13.3182 167.012 13.8647 168.464 14.8174C169.786 15.685 170.485 16.8155 170.671 18.3849Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M130.807 3.95453H128.307V6.45453V36.8182C128.307 38.7118 127.894 40.3024 127.129 41.658L127.126 41.6643C126.385 42.9866 125.315 44.0441 123.845 44.8461C122.419 45.6097 120.619 46.0454 118.352 46.0454C116.088 46.0454 114.289 45.6105 112.863 44.8483C111.409 44.0472 110.332 42.987 109.573 41.6541C108.81 40.2993 108.398 38.7099 108.398 36.8182V6.45453V3.95453H105.898H100.261H97.7614V6.45453V37.2727C97.7614 40.8602 98.6035 44.1499 100.339 47.0721L100.344 47.0798L100.348 47.0874C102.096 49.9824 104.547 52.2513 107.635 53.8901L107.644 53.8952C110.778 55.5406 114.373 56.3182 118.352 56.3182C122.331 56.3182 125.927 55.5406 129.06 53.8952L129.07 53.8901C132.158 52.251 134.604 49.9805 136.337 47.0817C138.091 44.158 138.943 40.8649 138.943 37.2727V6.45453V3.95453H136.443H130.807Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M82.1406 21.7764L82.7037 23.5H84.517H90.3352H93.3487L92.7922 20.5383C92.3162 18.0057 91.4421 15.6683 90.1569 13.5483C88.8857 11.4364 87.2898 9.6138 85.3753 8.09412C83.4731 6.55699 81.3157 5.38416 78.9237 4.56864C76.5166 3.72752 73.9504 3.31818 71.2442 3.31818C67.9435 3.31818 64.8579 3.93145 62.0231 5.19331C59.2026 6.44876 56.7577 8.25881 54.7046 10.6028C52.6435 12.9559 51.0815 15.7686 49.9898 18.994L49.9898 18.994L49.9874 19.0012C48.9024 22.2395 48.3806 25.8247 48.3806 29.7273C48.3806 34.9259 49.2953 39.5566 51.2204 43.5419L51.2204 43.542L51.2241 43.5497C53.1536 47.5093 55.882 50.6387 59.4202 52.8479L59.4248 52.8507C62.9889 55.0653 67.0786 56.1364 71.6079 56.1364C75.662 56.1364 79.355 55.2861 82.6183 53.5156L82.6224 53.5134C85.8913 51.7319 88.4696 49.2064 90.3203 45.974C92.2099 42.7006 93.1079 38.9221 93.1079 34.7273V29.7273V27.2273H90.6079H72.8806H70.3806V29.7273V34.7273V37.2273H72.8806H82.4044C82.1693 38.4916 81.7723 39.6089 81.2325 40.5961L81.2295 40.6017C80.3146 42.285 79.058 43.5619 77.429 44.4794C75.824 45.3769 73.9087 45.8636 71.6079 45.8636C69.163 45.8636 67.0328 45.2653 65.1501 44.101C63.3033 42.9589 61.777 41.246 60.6061 38.8384C59.4661 36.4944 58.8352 33.4905 58.8352 29.7273C58.8352 25.9605 59.4597 22.953 60.5882 20.6062C61.7498 18.1906 63.2526 16.479 65.0554 15.3417C66.9 14.178 68.9424 13.5909 71.2442 13.5909C72.7003 13.5909 73.9831 13.7875 75.1131 14.152C76.2587 14.5215 77.2523 15.047 78.1148 15.7205L78.1212 15.7255L78.1278 15.7306C79.0193 16.4173 79.7923 17.2535 80.4477 18.2552L80.4576 18.2702L80.4676 18.285C81.1436 19.2866 81.7055 20.4447 82.1406 21.7764Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        <path d="M13.5454 55.5H15.3108L15.9014 53.8363L19.9902 42.3182H35.2825L39.3713 53.8363L39.9619 55.5H41.7273H47.6364H51.2175L49.9831 52.1383L32.8922 5.59281L32.2907 3.95453H30.5454H24.7273H22.982L22.3805 5.59281L5.28956 52.1383L4.05518 55.5H7.63635H13.5454ZM27.6364 20.779L31.7326 32.3182H23.5401L27.6364 20.779Z" stroke="rgb(84, 160, 232)" strokeWidth="5"/>
        </svg>
        </div>
            <img src="/img/menu.svg" alt="burger" style={{width: "40px", margin: "0 0 0 10px"}} />
        </div>
        <ul className="navbar__list">
            <ModalNavbar show={modalView} setShow={setModalView} idTarget={idTarget} /> 
            { isAuthenticated && 
            <>
            <Link to='/dashboard'>
            <div className="navbar__li-box" key={1000}>
                <li
                className="navbar__li"
                style={{ display: window === false ? "inline-block" : "none" }}
                >
                    Dashboard
                </li>
            </div>
            </Link>
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
            {data?.map((item, i) => (
                <div className="navbar__li-box" key={item.id}>
                    <HoverComponent itemId={item.id} setModalView={setModalView} setIdTarget={setIdTarget} >
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
        </nav>
    );
};

export default NavBar;
