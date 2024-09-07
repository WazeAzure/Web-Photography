import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/col' 
import { Form, Button } from "react-bootstrap";

import "./Login.css"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/dashboard")
            // console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <Row className="h-100" style={{width: "100%"}}>
            <Col id="empty-space" className="h-100">

            </Col>
            <Col className="container align-middle" style={{"margin": "2rem"}}>      
                <section>
                    <h1>asdasd</h1>
                    <div>                                                                 
                        <Form className="Form-Login">                                              
                            <Form.Group>
                                <Form.Label>
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    id="email-address"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    id="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                            </Form.Group>
                                                
                            <Button                                    
                                onClick={onLogin}                                        
                            >      
                                Login                                                                  
                            </Button>                              
                        </Form>                    
                    </div>
                </section>
            </Col>
        </Row>
    )
}
 
export default Login