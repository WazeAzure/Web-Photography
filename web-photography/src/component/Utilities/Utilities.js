import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Col, Dropdown, Row } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import { Form, InputGroup, Button } from "react-bootstrap";
import ModalForm from "../Modals/Modals";
import { useState, useEffect } from "react";
import { onSnapshot, query, collection, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const Utilities = ({photoList, setPhotoList, data, setData}) => {
    const [selectedValue, setSelectedValue] = useState("Filter");
    
    const handleSubmit = (e) => {
        console.log("dari utilities form submitted")
    }

    const handleModals = (e) => {

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
    
    return (
        <>
            <Row className="mb-2">
                <SearchBar  className="col" photoList={photoList} setPhotoList={setPhotoList} data={data} setData={setData} />
                <Form.Group as={Col} controlId="form right">
                    <Row>
                        <Dropdown className="col" onSelect={handleSelect}>
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
                        <ModalForm />
                    </Row>
                </Form.Group>
            </Row>
        </>
    )
}

export default Utilities