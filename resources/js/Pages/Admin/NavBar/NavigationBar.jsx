import {Button, Container, Nav, Navbar, OverlayTrigger, Popover, Tab, Tabs} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, {useContext} from "react";
import {AuthenticatedUserContext} from "../Contexts/AuthenticatedUserContext";
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ConflictsContainer} from "./Conflicts/ConflictsContainer";
import {IconExplanationsModal} from "../Modals/IconExplanationsModal";

export function NavigationBar({activeTab,activeMenusTab,children, conflicts}) {
    const {activeTabKey,handleSetActiveKey} = activeTab,
    {activeMenusTabKey,setActiveMenusTabKey} = activeMenusTab,
    User = useContext(AuthenticatedUserContext),
    InnerWidth = useContext(InnerWidthContext);

    return (
        <Navbar expand="xl" className="bg-body-tertiary rounded-3 border mx-4">
            <Container fluid className={'mx-lg-3'}>
                <Navbar.Brand href="#home" className={'user-select-none'}>Sentido Port Royal</Navbar.Brand>
                <ConflictsContainer conflicts={conflicts}></ConflictsContainer>
                <IconExplanationsModal></IconExplanationsModal>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas
                    id={`Navbar-expand`}
                    aria-labelledby={`offcanvasNavbarLabel-expand`}
                    placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} className={'user-select-none'}>
                            Μενού
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={'pe-0 ps-4 d-flex flex-column flex-xl-row'}>
                        <Navbar.Text className={'fw-bold order-1 order-xl-2 ms-xl-auto text-center'}>
                            Συνδεδεμένος / η ώς : {User.first_name + ' '+ User.last_name}
                        </Navbar.Text>
                        <Nav className="user-select-none w-50 order-2 order-xl-1">
                            <Nav.Link href="#Κρατήσεις" className={'primary my-auto'} onClick={()=>handleSetActiveKey("Reservations")} disabled={activeTabKey === 'Reservations'}>Κρατήσεις</Nav.Link>
                            <Nav.Link href="#Μενού" onClick={()=>handleSetActiveKey("Menus")} className={'primary my-auto'}
                                disabled={activeTabKey === 'Menus'}>Μενού</Nav.Link>
                            {activeTabKey === 'Menus' && <Nav.Link href="#Μενού-Υπάρχοντα"
                                                                   className={'border-start px-2 ms-1 my-2 my-md-0 secondary'}
                                                                   onClick={() => setActiveMenusTabKey("Existing")} disabled={activeMenusTabKey === 'Existing'}>Υπάρχοντα</Nav.Link>}
                            {activeTabKey === 'Menus' && <Nav.Link href="#Μενού-Δημιουργία"
                                                                   className={'border-end px-2 ms-1 my-2 my-md-0 secondary'}
                                                                   onClick={() => setActiveMenusTabKey("New")} disabled={activeMenusTabKey === 'New'}>Δημιουργία</Nav.Link>}

                            <Nav.Link href="#Ρυθμίσεις" className={'primary my-auto'} onClick={()=>handleSetActiveKey("Settings")}>Ρυθμίσεις</Nav.Link>
                        </Nav>
                        <div className={'order-1 order-xl-3 mb-5 mb-md-4'}>
                            {children}
                        </div>
                        <Button variant={"outline-secondary"} className={'mt-auto mt-lg-0 my-xl-auto ms-xl-3 order-3 mx-auto mx-xl-0'} onClick={()=>Inertia.post(route('logout'))}>
                            Αποσύνδεση
                        </Button>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
