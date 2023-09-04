import {Button, Col, Container, Nav, Navbar, NavDropdown, OverlayTrigger, Popover, Tab, Tabs} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, {useContext} from "react";
import {AuthenticatedUserContext} from "../Contexts/AuthenticatedUserContext";
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ConflictsContainer} from "./Conflicts/ConflictsContainer";
import {UsefulInfoModal} from "../Modals/UsefulInfoModal";
import {MenuEditModeContext} from "../Contexts/MenuEditModeContext";
import {AdminToNewReservationFormModal} from "../Modals/AdminToNewReservationFormModal";
import {ReservationTypeSelectionMenu} from "../Reservations/Settings/ReservationTypeSelectionMenu";
import {NavBarReservations} from "./NavBarReservations";

export function NavigationBar({activeTab,activeMenusTab, conflicts}) {
    const {activeTabKey,handleSetActiveKey} = activeTab,
    {activeMenusTabKey,setActiveMenusTabKey} = activeMenusTab,
    User = useContext(AuthenticatedUserContext),
    {editingMenu,setEditingMenu} = useContext(MenuEditModeContext);

    return (
        <Navbar expand="xxl" className="bg-body-tertiary rounded-3 border mx-4" collapseOnSelect>
            <Container fluid className={'mx-lg-3'}>
                <Navbar.Brand href="#home" className={'user-select-none'}>Sentido Port Royal</Navbar.Brand>
                <ConflictsContainer conflicts={conflicts}></ConflictsContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas id={`Navbar-expand`} placement="start"
                    aria-labelledby={`offcanvasNavbarLabel-expand`}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} className={'user-select-none'}>
                            Μενού
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={'px-3 ps-xxl-0 ms-xxl-2 d-flex flex-column flex-xxl-row'}>
                        <Navbar.Text className={'fw-bold order-1 order-xxl-2 ms-xxl-auto text-center w-fit-content'}>
                            Συνδεδεμένος / η ώς : {User.first_name + ' '+ User.last_name}
                        </Navbar.Text>
                        <UsefulInfoModal className={'order-3 order-xxl-1 my-3 mx-xxl-2'}></UsefulInfoModal>
                        {/*Second In large Screen, 3rd in mobiles and tablets*/}
                        <Nav className="user-select-none w-50 order-2 order-xxl-1">
                            {/*<Nav.Link href="#Κρατήσεις" className={'primary my-auto hover-scale-1_03'}*/}
                            {/*onClick={()=>handleSetActiveKey("Reservations")} disabled={activeTabKey === 'Reservations'}>Κρατήσεις</Nav.Link>*/}
                            <NavBarReservations activeTab={activeTab}/>
                            <NavDropdown title="Μενού" id="navbarMenusScrollingDropdown" className={'my-auto'}>
                                <NavDropdown.Item href="#Μενού-Υπάρχοντα" className={'px-2 ms-1 my-2 my-md-auto secondary hover-scale-1_03'}
                                  onClick={() => {handleSetActiveKey('Menus');setActiveMenusTabKey("Existing");}}
                                  disabled={activeMenusTabKey === 'Existing' && activeTabKey === 'Menus'}>
                                  Υπάρχοντα
                                </NavDropdown.Item>
                                    <NavDropdown.Item href="#Μενού-Δημιουργία"
                                      className={'px-2 ms-1 my-2 my-md-auto secondary hover-scale-1_03'}
                                      onClick={() => {
                                          handleSetActiveKey('Menus');
                                          setActiveMenusTabKey("New");
                                      }} disabled={activeMenusTabKey === 'New'  && activeTabKey === 'Menus'}>Δημιουργία
                                </NavDropdown.Item>
                                {editingMenu !== null && <NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <Nav.Link href={`#Επεξεργασία-${editingMenu.Name}`} className={`text-center hover-scale-1_03 px-2 ms-1 my-2 my-md-auto important ${activeTabKey === 'Menus' ? ' secondary' : 'primary'}`}
                                              onClick={() => {setActiveMenusTabKey("Edit"); handleSetActiveKey('Menus',true);}} disabled={activeMenusTabKey === 'Edit' && activeTabKey ==='Menus'}
                                    >{`Επεξεργασία`}</Nav.Link>
                                </NavDropdown.Item>}
                            </NavDropdown>

                            <Nav.Link href="#Ρυθμίσεις" className={'primary my-auto'} onClick={()=>handleSetActiveKey("Settings")}>Ρυθμίσεις</Nav.Link>
                            <AdminToNewReservationFormModal/>
                        </Nav>
                        {/* Second In large Screens */}
                        {innerWidth < 992 && <div className={'order-1 order-xxl-3 box_shadow rounded-4 border my-3 my-lg-0 px-5 py-1 text-center'}>
                            <ReservationTypeSelectionMenu activeTabKey={activeTabKey}></ReservationTypeSelectionMenu>
                        </div>}
                        <Button variant={"outline-secondary"} className={'mt-auto mt-lg-0 my-xxl-auto ms-xxl-3 order-3 mx-auto mx-xxl-0'} onClick={()=>Inertia.post(route('logout'))}>
                            Αποσύνδεση
                        </Button>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
