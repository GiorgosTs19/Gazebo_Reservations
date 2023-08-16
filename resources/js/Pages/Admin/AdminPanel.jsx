import {Card, Col, Container, Nav, Navbar, Row, Tab, Tabs} from "react-bootstrap";
import {MenuAdminPanel} from "./Menu/MenuAdministrationPage";
import React, {useEffect, useState} from "react";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {ReservationsPanel} from "./Reservations/ReservationsPanel";
import {GazebosContext} from "../../Contexts/GazebosContext";
import '../../../css/Admin.css'
import {SettingsPanel} from "./Settings/SettingsPanel";
import '../../../css/Calendar.css';
import {MenuContext} from "../../Contexts/MenuContext";
import {PendingUnsavedChangesContext} from "./Contexts/PendingUnsavedChangesContext";
import {ShouldShowUnsavedChangesModalContext} from "./Contexts/ShouldShowUnsavedChangesModalContext";
import {AuthenticatedUserContext} from "./Contexts/AuthenticatedUserContext";
import {ReservationTypeSelectionMenu} from "./Reservations/Settings/ReservationTypeSelectionMenu";
import {ViewSelectionMenu} from "./Reservations/Settings/ViewSelectionMenu";
import {ViewContext} from "../../Contexts/ViewContext";
import {ActiveReservationTypeContext} from "./Contexts/ActiveReservationTypeContext";
import {NavigationBar} from "./NavBar/NavigationBar";
import {ActiveReservationContext} from "./Contexts/ActiveReservationContext";
import {DatabaseSettingsContext} from "./Contexts/DatabaseSettingsContext";
import {ReservationsContext} from "../../Contexts/ReservationsContext";
import {MenuEditModeContext} from "./Contexts/MenuEditModeContext";

export default function AdminPanel(props) {
    const Menus = props.Menus,
    Dinner_Reservations = props.Dinner_Reservations,
    Bed_Reservations = props.Bed_Reservations,
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    Gazebos = props.Gazebos, Dinner_Settings = props.Dinner_Settings, Bed_Settings = props.Bed_Settings,
    ActiveTab = props.ActiveTab,
    [isMobile,setIsMobile] = useState(innerWidth < 992),
    [activeReservationsView,setActiveReservationsView] = useState('Today'),
    [reservationType,setReservationType] = useState('Dinner'),
    [editingMenu,setEditingMenu] = useState(null),
    [activeReservation,setActiveReservation] = useState(null);
    const User = props.auth.user;
    const [activeTabKey, setActiveTabKey] = useState(ActiveTab),
    [activeMenusTabKey, setActiveMenusTabKey] = useState('Existing');
    const [pendingUnsavedChanges, setPendingUnsavedChanges] = useState({Dinner:false,Bed:false}),
    [showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal] = useState({Show:false,Key:''});
    const renderContent = () => {
        switch (activeTabKey) {
            case 'Settings' : {
                return SettingsContent;
            }
            case 'Reservations' : {
                return ReservationsContent;
            }
            case 'Menus' : {
                return MenuContent;
            }
        }
    };

    const handleSetActiveKey = (k,bypass=false) => {
        if(!bypass)
            if(activeTabKey === 'Settings' && (pendingUnsavedChanges.Dinner || pendingUnsavedChanges.Bed)) {
                setShowUnsavedChangesWarningModal({...showUnsavedChangesWarningModal,Show:true,Key:k});
                return;
            }
        setActiveTabKey(k);
    }

    const getReservationsByActiveType = () => {
        switch (reservationType) {
            case 'Dinner' :
                return Dinner_Reservations;
            case 'Bed' :
                return Bed_Reservations;
        }
    };
    const ReservationsContent = <ReservationsPanel></ReservationsPanel>,
        MenuContent = <MenuAdminPanel Menus={Menus} activeKey={{activeMenusTabKey,setActiveMenusTabKey}}></MenuAdminPanel>,
        SettingsContent =
            <SettingsPanel bedSettings={Bed_Settings} dinnerSettings={Dinner_Settings}>
            </SettingsPanel>;
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <AuthenticatedUserContext.Provider value={User}>
            <DatabaseSettingsContext.Provider value={{settings : reservationType === 'Dinner' ? Dinner_Settings : Bed_Settings}}>
                <ReservationsContext.Provider value={getReservationsByActiveType()}>
                    <InnerWidthContext.Provider value={innerWidth}>
                        <GazebosContext.Provider value={Gazebos}>
                            <MenuContext.Provider value={Menus}>
                                <Container fluid className={'px-0 pt-3 pb-0 vh-100 position-absolute '  + (innerWidth<992 ? 'overflow-auto' : 'overflow-auto')}>
                                    <NavigationBar activeTab={{activeTabKey,handleSetActiveKey}} activeMenusTab={{activeMenusTabKey,setActiveMenusTabKey}}></NavigationBar>
                                    <div className={'h-90 px-3 vw-100 position-absolute '  + (innerWidth<992 ? 'overflow-auto' : 'overflow-auto')}>
                                        <Card className={"px-2 mx-sm-auto mx-lg-0 mx-3 border-0 pb-2 overflow-y-auto h-100 "} >
                                            <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                                                <ViewContext.Provider value={{activeReservationsView,setActiveReservationsView}}>
                                                    <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                                                        <MenuEditModeContext.Provider value={{editingMenu,setEditingMenu}}>
                                                            <Card.Header className={'text-center border-0 bg-transparent mt-4 mt-lg-0'}>
                                                                <Row className={'p-0'}>
                                                                    <Col lg={3} className={'d-flex box_shadow rounded-4 border ' + (isMobile ? 'border-bottom px-3 py-3 my-4' :
                                                                        ' border-end px-3 ')}>
                                                                        <ReservationTypeSelectionMenu></ReservationTypeSelectionMenu>
                                                                    </Col>
                                                                    <Col lg={9}>
                                                                        <div className={'box_shadow px-0 px-xl-4 rounded-4 py-2 border mt-4 mt-lg-0 '}>
                                                                            {activeTabKey === 'Reservations' && <ViewSelectionMenu></ViewSelectionMenu>}
                                                                            {activeTabKey === 'Menus' &&  activeMenusTabKey !== 'Edit' &&  <h4 className={'my-3'}>Διαχείριση Menu</h4>}
                                                                            {activeTabKey === 'Settings' &&
                                                                                <h4 className={'my-3'}>Ρυθμίσεις {reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}</h4>}
                                                                            {activeMenusTabKey === 'Edit' && activeTabKey === 'Menus' && <h4 className={'my-3'}>Επεξεργασία {editingMenu.Name}</h4>}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Header>
                                                            <Card.Body className={'box_shadow px-4 rounded-4 border border-gray-400 mt-3 overflow-x-hidden pt-1 pb-0 ' + (innerWidth > 500 ? 'h-75' : (activeReservationsView === 'Search' ? 'h-100' : 'h-75'))}>
                                                                <PendingUnsavedChangesContext.Provider value={{pendingUnsavedChanges,setPendingUnsavedChanges}}>
                                                                    <ShouldShowUnsavedChangesModalContext.Provider value={{showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,handleSetActiveKey}}>
                                                                        {renderContent()}
                                                                    </ShouldShowUnsavedChangesModalContext.Provider>
                                                                </PendingUnsavedChangesContext.Provider>
                                                            </Card.Body>
                                                        </MenuEditModeContext.Provider>
                                                    </ActiveReservationContext.Provider>
                                                </ViewContext.Provider>
                                            </ActiveReservationTypeContext.Provider>
                                        </Card>
                                    </div>
                                </Container>
                            </MenuContext.Provider>
                        </GazebosContext.Provider>
                    </InnerWidthContext.Provider>
                </ReservationsContext.Provider>
            </DatabaseSettingsContext.Provider>
        </AuthenticatedUserContext.Provider>
    )
}
