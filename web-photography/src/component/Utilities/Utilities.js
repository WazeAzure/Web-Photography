import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Col, Dropdown, Modal, Row } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import { Form, InputGroup, Button } from "react-bootstrap";
import ModalForm from "../Modals/Modals";
import { useState, useEffect } from "react";
import { onSnapshot, orderBy, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";


const Utilities = ({photoList, setPhotoList, data, setData}) => {
    const [selectedValue, setSelectedValue] = useState("Filter");
    const [showTopik, setShowTopik] = useState(false);
    const [newTopik, setNewTopik] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const topikRef = collection(db, "topik");
        
        // check mechanism
        const checkQuery = query(topikRef, where("name", "==", newTopik));
        const checkSnapshot = await getDocs(checkQuery);

        // If the new topik name already exists, stop the process and show an error
        if (!checkSnapshot.empty) {
            console.error("The edited topik name already exists. Process failed.");
            alert("The edited topik name already exists. Please choose a different name.");
            return;
        }

        const docRef = await addDoc(collection(db, "topik"), {
            name: newTopik
        })

        const descRef = await addDoc(collection(db, "deskripsi-utama"), {
            description: "",
            name: newTopik
        })

    }

    const [topicList, setTopicList] = useState(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "topik"), orderBy('name')), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTopicList(newData);
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        let filteredData = [];

        if(photoList != null){
            // console.log("selectedValue: " + selectedValue)
            if(selectedValue != "Filter"){
                filteredData = data.filter((e) => {
                    return e.topic.toLowerCase().includes(selectedValue.toLowerCase())
                })
                setPhotoList(filteredData)
            } else {
                setPhotoList(data)
            }
        }
    }, [selectedValue])

    const handleSelect = (e) => {
        setSelectedValue(e)
    }

    const handleShowTopik = (e) => {
        setShowTopik(true);
    }
    
    const handleCloseTopik = (e) => {
        setShowTopik(false);
    }

    const handleNewTopik = (e) => {
        setNewTopik(e.target.value)
    }
    
    return (
        <>
            <Row className="mb-2">
                <SearchBar  className="col" photoList={photoList} setPhotoList={setPhotoList} data={data} setData={setData} />
                <Form.Group as={Col} controlId="form right" style={{width: "80%"}}>
                    <Row style={{width: "90%"}}>
                        <Dropdown className="col" onSelect={handleSelect} style={{marginBottom: "0.5rem"}}>
                            <Dropdown.Toggle key="as" variant="success" id="dropdown-basic">
                                {selectedValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={"Filter"}>Filter - None</Dropdown.Item>
                                {topicList?.map((d, i) => (
                                    <Dropdown.Item key={i} eventKey={d.name}>{d.name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <ModalForm/>
                        <div className="col">
                            <Button variant="primary" onClick={handleShowTopik} style={{width: "6rem"}}>
                                <FontAwesomeIcon icon={faAdd} className="pr-1"/>
                                <span style={{marginLeft: "0.5rem"}}>topics</span>
                            </Button>
                            <Modal show={showTopik} onHide={handleCloseTopik}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add New Topic</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group controlId="formTopik.toLowerCase()">
                                        <Form.Label>Topic:</Form.Label>

                                        <Form.Control type="text" required value={newTopik} onChange={handleNewTopik}/>
                                        
                                        <Form.Control.Feedback type="invalid">
                                            Please input a topik.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseTopik}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </Row>
                </Form.Group>
            </Row>
        </>
    )
}

export default Utilities