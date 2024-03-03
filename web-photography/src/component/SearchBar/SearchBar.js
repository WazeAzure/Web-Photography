import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";

const SearchBar = () => {
    const [testing, setTesting] = useState();

    const handleSearch = (e) => {
        setTesting(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTesting('')
        console.log("search bar form submitted")
    }

    return (
        <form className="col" onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formSearch">
            {testing}
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