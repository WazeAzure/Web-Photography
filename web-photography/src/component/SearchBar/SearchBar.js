import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import { orderBy, onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../firebase";

const SearchBar = ({photoList, setPhotoList, data, setData}) => {
    const [title, setTitle] = useState("");

    const handleSearch = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(testing)
        let filteredData = [];

        if(title == ""){
            setPhotoList(data)
        } else {
            filteredData = data.filter((e) => {
                return e.title.toLowerCase().includes(title.toLowerCase())
            })
            setPhotoList(filteredData)
        }

        // setTesting('')
        // console.log("search bar form submitted")
    }

    

    return (
        <form className="col" onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formSearch">
            <InputGroup className="mb-3" >
                <Form.Control
                    placeholder="title"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={title}
                    onChange={handleSearch}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </Form.Group> 
        </form>
    )
}

export default SearchBar