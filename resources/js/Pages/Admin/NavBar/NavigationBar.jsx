import {Button, Container, Nav, Navbar} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, {useContext} from "react";
import {AuthenticatedUserContext} from "../Contexts/AuthenticatedUserContext";
import {Inertia} from "@inertiajs/inertia";

export function NavigationBar({activeTab,activeMenusTab}) {
    const {activeTabKey,handleSetActiveKey} = activeTab,
    {activeMenusTabKey,setActiveMenusTabKey} = activeMenusTab,
    User = useContext(AuthenticatedUserContext);
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary rounded-3 border mx-4" >
            <Container fluid className={'mx-3'}>
                <Navbar.Brand href="#home" className={'user-select-none'}>Sentido Port Royal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand`}
                    aria-labelledby={`offcanvasNavbarLabel-expand`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} className={'user-select-none'}>
                            Μενού
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="user-select-none w-100">
                            <Nav.Link href="#Κρατήσεις" onClick={()=>handleSetActiveKey("Reservations")} disabled={activeTabKey === 'Reservations'}>Κρατήσεις</Nav.Link>
                            <Nav.Link href="#Μενού" onClick={()=>handleSetActiveKey("Menus")} disabled={activeTabKey === 'Menus'}>Μενού</Nav.Link>
                            {activeTabKey === 'Menus' && <Nav.Link href="#Μενού#Υπάρχοντα"
                                                                   className={'border-start px-2 ms-1 my-2 my-md-0'}
                                                                   onClick={() => setActiveMenusTabKey("Existing")}>Υπάρχοντα</Nav.Link>}
                            {activeTabKey === 'Menus' && <Nav.Link href="#Μενού#Δημιουργία"
                                                                   className={'border-end px-2 ms-1 my-2 my-md-0'}
                                                                   onClick={() => setActiveMenusTabKey("New")}>Δημιουργία</Nav.Link>}

                            <Nav.Link href="#Ρυθμίσεις" onClick={()=>handleSetActiveKey("Settings")}>Ρυθμίσεις</Nav.Link>
                            <Navbar.Text className={'fw-bold ms-auto me-0 me-md-5'}>
                                Συνδεδεμένος / η ώς : {User.first_name + ' '+ User.last_name}
                            </Navbar.Text>
                            <Button variant={"outline-secondary"} onClick={()=>Inertia.post(route('logout'))}>
                                Αποσύνδεση
                            </Button>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
