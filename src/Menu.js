import MessContext from './MessContext.js';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { Link } from 'react-router';

function MenuNoticias() {
    const { messages } = useContext(MessContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={`/`}>Whattsap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Contactos" id="basic-nav-dropdown">
                            {messages.map((receptor) => (
                                <div key={receptor.contacto}>
                                      <NavDropdown.Item as={Link} to={`/MessContacto/${receptor.contacto}`}>{receptor.contacto}</NavDropdown.Item>
                                </div>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuNoticias;