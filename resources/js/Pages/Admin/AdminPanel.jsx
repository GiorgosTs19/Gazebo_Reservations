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

export default function AdminPanel(props) {
    const Menus = props.Menus,
    Dinner_Reservations = props.Dinner_Reservations,
    Bed_Reservations = props.Bed_Reservations,
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    Gazebos = props.Gazebos,
    Dinner_Settings = props.Dinner_Settings,
    Bed_Settings = props.Bed_Settings,
    ActiveTab = props.ActiveTab,
    [pendingUnsavedChanges, setPendingUnsavedChanges] = useState({Dinner:false,Bed:false});
    const [activeTabKey, setActiveTabKey] = useState(ActiveTab),
    [showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal] = useState({Dinner:false,Bed:false,Key:''});
    const handleTabSelect = (k) => {
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
    console.log(props)
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // console.log(props)
    return (
        <InnerWidthContext.Provider value={innerWidth}>
            <GazebosContext.Provider value={Gazebos}>
                <MenuContext.Provider value={Menus}>
                    <Container fluid className={'px-3 py-3 '  + (innerWidth<992 ? 'overflow-auto' : '')}>
                        <Tabs defaultActiveKey="Reservations" className="mb-3" activeKey={activeTabKey}
                              onSelect={(k) => handleTabSelect(k)}>
                            <Tab eventKey="Reservations" title="Κρατήσεις">
                                <Col>
                                    <ReservationsPanel Bed_Reservations={Bed_Reservations}
                                                       Dinner_Reservations={Dinner_Reservations}>
                                    </ReservationsPanel>
                                </Col>
                            </Tab>
                            <Tab eventKey="Menus" title="Μενού">
                                <Col>
                                    <MenuAdminPanel Menus={Menus}></MenuAdminPanel>
                                </Col>
                            </Tab>
                            <Tab eventKey="Settings" title="Ρυθμίσεις">
                                <PendingUnsavedChangesContext.Provider value={{pendingUnsavedChanges,setPendingUnsavedChanges}}>
                                    <ShouldShowUnsavedChangesModalContext.Provider value={{showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,setActiveTabKey}}>
                                        <Col>
                                            <SettingsPanel Bed_Reservations={Bed_Reservations}
                                                           Dinner_Reservations={Dinner_Reservations}
                                                           bedSettings={Bed_Settings} dinnerSettings={Dinner_Settings}>
                                            </SettingsPanel>
                                        </Col>
                                    </ShouldShowUnsavedChangesModalContext.Provider>
                                </PendingUnsavedChangesContext.Provider>
                            </Tab>
                        </Tabs>
                    </Container>
                </MenuContext.Provider>
            </GazebosContext.Provider>
        </InnerWidthContext.Provider>
    )
}
