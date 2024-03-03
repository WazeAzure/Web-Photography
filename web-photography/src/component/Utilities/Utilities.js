import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Col, Dropdown, Row } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import { Form, InputGroup, Button } from "react-bootstrap";
import ModalForm from "../Modals/Modals";



const Utilities = () => {
    const handleSubmit = (e) => {
        console.log("dari utilities form submitted")
    }

    const handleModals = (e) => {

    }
    
    return (
        <>
            <Row className="mb-2">
                <SearchBar  className="col" />
                <Form.Group as={Col} controlId="form right">
                    <Row>
                        <Dropdown className="col">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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