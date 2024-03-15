import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import { orderBy, onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../firebase";

const SearchBar = ({photoList, setPhotoList}) => {
    const [testing, setTesting] = useState("");
    const [data, setData] = useState([])

    const handleSearch = (e) => {
        setTesting(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(testing)
        let filteredData = [];

        if(testing == ""){
            setPhotoList(data)
        } else {
            filteredData = data.filter((e) => {
                return e.title.toLowerCase().includes(testing.toLowerCase())
            })
            setPhotoList(filteredData)
        }

        // setTesting('')
        console.log("search bar form submitted")
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "gambar"), orderBy("date")), (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData)
            
            // console.log(newData); // Log the new data, not the state variable 'data'
        });

        // Return the unsubscribe function to clean up the listener
        return () => unsubscribe();
    }, [])

    return (
        <form className="col" onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formSearch">
            <InputGroup className="mb-3" >
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={testing}
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