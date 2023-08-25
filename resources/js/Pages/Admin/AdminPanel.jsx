import {Card, Col, Container, Row} from "react-bootstrap";
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
import {ConflictsContext} from "./Contexts/ConflictsContext";
import {ResolvingConflictContext} from "./Contexts/ResolvingConflictContext";
import {DinnerReservationLong} from "./Reservations/ReservationViews/DinnerReservationLong";
import {ActiveTabKeyContext} from "./Contexts/ActiveTabKeyContext";

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
    [showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal] = useState({Show:false,Key:''}),
        // A boolean to indicate if the active reservation showing fullScreen is about a conflict resolution,
        // it also stores the previous ActiveTabKey to return to after the actions are done.
    [resolvingConflict,setResolvingConflict] = useState([false,'']),
    Conflicts = props.Conflicts;
    const renderContent = () => {
        switch (activeTabKey) {
            case 'Settings' : {
                if(resolvingConflict[0])
                    setResolvingConflict([false,'']);
                return SettingsContent;
            }
            case 'Reservations' : {
                if(resolvingConflict[0])
                    setResolvingConflict([false,'']);
                return ReservationsContent;
            }
            case 'Menus' : {
                if(resolvingConflict[0])
                    setResolvingConflict([false,'']);
                // setActiveMenusTabKey('Existing');
                return MenuContent;
            }
            case 'ResolveConflict' : {
                return <DinnerReservationLong></DinnerReservationLong>;

            }
        }
    };
    const handleSetActiveKey = (k,bypass=false) => {
        if(!bypass)
            if(activeTabKey === 'Settings' && (pendingUnsavedChanges.Dinner || pendingUnsavedChanges.Bed)) {
                setShowUnsavedChangesWarningModal({...showUnsavedChangesWarningModal,Show:true,Key:k});
                return;
            }
        if(k === 'Menus')
            setActiveMenusTabKey('Existing');
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
    console.log(props)
    const ReservationsContent = <ReservationsPanel></ReservationsPanel>,
        MenuContent = <MenuAdminPanel Menus={Menus} activeKey={{activeMenusTabKey,setActiveMenusTabKey}}></MenuAdminPanel>,
        SettingsContent = <SettingsPanel bedSettings={Bed_Settings} dinnerSettings={Dinner_Settings}></SettingsPanel>,
    typeAndViewSelectionPanel = <Row className={'p-0 w-100 d-flex flex-row'}>
        <Col lg={4} className={'d-flex box_shadow rounded-4 border flex-column my-3 my-lg-0 ' + (isMobile ? ' border-bottom ' :
            ' border-end px-3')}>
            <ReservationTypeSelectionMenu activeTabKey={activeTabKey}></ReservationTypeSelectionMenu>
        </Col>
        <Col lg={8} className={'d-flex flex-column mt-2 mt-lg-0 text-center'}>
            <div className={'box_shadow px-2 px-lg-0 px-xl-4 rounded-4 py-2 border my-auto mx-auto mx-md-0 ms-lg-5'}>
                {activeTabKey === 'Reservations' && <ViewSelectionMenu></ViewSelectionMenu>}
                {activeTabKey === 'Menus' && activeMenusTabKey !== 'Edit' &&
                    <h4 className={'my-3'}>Διαχείριση Menu {reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}</h4>}
                {activeTabKey === 'Settings' &&
                    <h4 className={'my-3'}>Ρυθμίσεις {reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}</h4>}
                {activeMenusTabKey === 'Edit' && activeTabKey === 'Menus' &&
                    <h4 className={'my-3'}>Επεξεργασία {editingMenu.Name}</h4>}
            </div>
        </Col>
    </Row>;

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
                                    <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                                        <ViewContext.Provider value={{activeReservationsView,setActiveReservationsView}}>
                                            <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                                                <ResolvingConflictContext.Provider value={{resolvingConflict,setResolvingConflict}}>
                                                    <ActiveTabKeyContext.Provider value={{activeTabKey,handleSetActiveKey}}>
                                                        <ConflictsContext.Provider value={Conflicts}>
                                                            <NavigationBar activeTab={{activeTabKey,handleSetActiveKey}} activeMenusTab={{activeMenusTabKey,setActiveMenusTabKey}}
                                                                           conflicts={props.Conflicts}>
                                                                {innerWidth < 992 && typeAndViewSelectionPanel}
                                                            </NavigationBar>
                                                                <div className={'h-90 px-xs-5  vw-100 position-absolute '  + (innerWidth<992 ? 'overflow-auto' : 'overflow-auto')}>
                                                                    <Card className={"px-2 px-lg-2 mx-sm-0 mx-lg-0 border-0 pb-2 overflow-y-auto h-100 px-sm-2"} >
                                                                        <MenuEditModeContext.Provider value={{editingMenu,setEditingMenu}}>
                                                                            {innerWidth > 992 &&
                                                                                <Card.Header className={'text-center border-0 bg-transparent mt-xs-2 mt-lg-1 '}>
                                                                                    {typeAndViewSelectionPanel}
                                                                                </Card.Header>}
                                                                            <Card.Body className={'box_shadow px-xs-1 px-lg-4 rounded-4 border border-gray-400 mt-3 overflow-x-hidden pt-1 pb-0 ' + (innerWidth > 500 ? 'h-77 ' : (activeReservationsView === 'Search' ? 'h-100' : 'h-75'))}>
                                                                                <PendingUnsavedChangesContext.Provider value={{pendingUnsavedChanges,setPendingUnsavedChanges}}>
                                                                                    <ShouldShowUnsavedChangesModalContext.Provider value={{showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,handleSetActiveKey}}>
                                                                                        {renderContent()}
                                                                                    </ShouldShowUnsavedChangesModalContext.Provider>
                                                                                </PendingUnsavedChangesContext.Provider>
                                                                            </Card.Body>
                                                                        </MenuEditModeContext.Provider>
                                                                    </Card>
                                                                </div>
                                                        </ConflictsContext.Provider>
                                                    </ActiveTabKeyContext.Provider>
                                                </ResolvingConflictContext.Provider>
                                            </ActiveReservationContext.Provider>
                                        </ViewContext.Provider>
                                    </ActiveReservationTypeContext.Provider>
                                </Container>
                            </MenuContext.Provider>
                        </GazebosContext.Provider>
                    </InnerWidthContext.Provider>
                </ReservationsContext.Provider>
            </DatabaseSettingsContext.Provider>
        </AuthenticatedUserContext.Provider>
    )
}
