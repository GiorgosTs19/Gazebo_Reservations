import {Col, Container, Tab, Tabs} from "react-bootstrap";
import {MenuAdminPanel} from "./Menu/MenuAdministrationPage";
import React, {useEffect, useState} from "react";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {ReservationsPanel} from "./Reservations/ReservationsPanel";
import {GazebosContext} from "../../Contexts/GazebosContext";
import '../../../css/Admin.css'
import {SettingsPanel} from "./Settings/SettingsPanel";
import 'react-calendar/dist/Calendar.css';
import {MenuContext} from "../../Contexts/MenuContext";
import {PendingUnsavedChangesContext} from "./Contexts/PendingUnsavedChangesContext";
import {ShouldShowUnsavedChangesModalContext} from "./Contexts/ShouldShowUnsavedChangesModalContext";
import {AuthenticatedUserContext} from "./Contexts/AuthenticatedUserContext";
import {Inertia} from "@inertiajs/inertia";
import {SettingsContext} from "./Contexts/SettingsContext";

export default function AdminPanel(props) {
    const Menus = props.Menus,
    Dinner_Reservations = props.Dinner_Reservations,
    Bed_Reservations = props.Bed_Reservations,
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    Gazebos = props.Gazebos,
    Dinner_Settings = props.Dinner_Settings,
    Bed_Settings = props.Bed_Settings,
    ActiveTab = props.ActiveTab,
    User = props.auth.user,
    [pendingUnsavedChanges, setPendingUnsavedChanges] = useState({Dinner:false,Bed:false});
    const [activeTabKey, setActiveTabKey] = useState(ActiveTab),
    [showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal] = useState({Dinner:false,Bed:false,Key:''});
    const handleTabSelect = (k) => {
        if(k === 'Logout') {
            Inertia.post(route('logout'));
            return;
        }
        if(activeTabKey === 'Settings' && pendingUnsavedChanges.Dinner) {
            setShowUnsavedChangesWarningModal({...showUnsavedChangesWarningModal,Dinner:true,Key:k});
            return;
        }
        if(activeTabKey === 'Settings' && pendingUnsavedChanges.Bed) {
            setShowUnsavedChangesWarningModal({...showUnsavedChangesWarningModal,Bed:true,Key:k});
            return;
        }
        setActiveTabKey(k);
    };
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log(props)
    return (
        <AuthenticatedUserContext.Provider value={User}>
            <InnerWidthContext.Provider value={innerWidth}>
                <GazebosContext.Provider value={Gazebos}>
                    <MenuContext.Provider value={Menus}>
                        <Container fluid className={'px-3 pt-3 pb-0 vh-100 position-absolute '  + (innerWidth<992 ? 'overflow-auto' : 'overflow-auto')}>
                            <Tabs defaultActiveKey="Reservations" className="mb-2 d-flex" activeKey={activeTabKey}
                                  onSelect={(k) => handleTabSelect(k)}>
                                <Tab eventKey="Reservations" title="Κρατήσεις">
                                    <Col className={'h-100'}>
                                        <ReservationsPanel Bed_Reservations={Bed_Reservations}
                                                           Dinner_Reservations={Dinner_Reservations}
                                        Dinner_Settings={Dinner_Settings} Bed_Settings={Bed_Settings}>
                                        </ReservationsPanel>
                                    </Col>
                                </Tab>
                                <Tab eventKey="Menus" title="Μενού">
                                    <Col className={'h-100'}>
                                        <MenuAdminPanel Menus={Menus}></MenuAdminPanel>
                                    </Col>
                                </Tab>
                                <Tab eventKey="Settings" title="Ρυθμίσεις">
                                    <PendingUnsavedChangesContext.Provider value={{pendingUnsavedChanges,setPendingUnsavedChanges}}>
                                        <ShouldShowUnsavedChangesModalContext.Provider value={{showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,setActiveTabKey}}>
                                            <Col className={'h-100'}>
                                                <SettingsPanel Bed_Reservations={Bed_Reservations}
                                                               Dinner_Reservations={Dinner_Reservations}
                                                               bedSettings={Bed_Settings} dinnerSettings={Dinner_Settings}>
                                                </SettingsPanel>
                                            </Col>
                                        </ShouldShowUnsavedChangesModalContext.Provider>
                                    </PendingUnsavedChangesContext.Provider>
                                </Tab>
                                <Tab disabled title={'Συνδεδεμένος / η ώς ' + User.first_name + ' '+ User.last_name}></Tab>
                                <Tab title={'Αποσύνδεση'} eventKey={'Logout'}></Tab>
                            </Tabs>
                        </Container>
                    </MenuContext.Provider>
                </GazebosContext.Provider>
            </InnerWidthContext.Provider>
        </AuthenticatedUserContext.Provider>
    )
}
