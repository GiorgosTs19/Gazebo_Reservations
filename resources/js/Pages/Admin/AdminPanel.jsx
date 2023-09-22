import {MenuAdminPanel} from "./Menu/MenuAdministrationPage";
import {useEffect, useState} from "react";
import {ReservationsPanel} from "./Reservations/ReservationsPanel";
import {SettingsPanel} from "./Settings/SettingsPanel";
import {ReservationTypeSelectionMenu} from "./Reservations/Settings/ReservationTypeSelectionMenu";
import {ViewSelectionMenu} from "./Reservations/Settings/ViewSelectionMenu";
import {NavigationBar} from "./NavBar/NavigationBar";
import {ReservationLong} from "./Reservations/ReservationViews/ReservationLong/ReservationLong";
import {MobileActiveReservationOffCanvas} from "./OffCanvases/MobileActiveReservationOffCanvas";
import '../../../css/Admin.css'
import '../../../css/Calendar.css';
import {Card, Col, Container, Row} from "react-bootstrap";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {MenuContext} from "../../Contexts/MenuContext";
import {PendingUnsavedChangesContext} from "./Contexts/PendingUnsavedChangesContext";
import {ShouldShowUnsavedChangesModalContext} from "./Contexts/ShouldShowUnsavedChangesModalContext";
import {AuthenticatedUserContext} from "./Contexts/AuthenticatedUserContext";
import {ViewContext} from "../../Contexts/ViewContext";
import {ActiveReservationTypeContext} from "./Contexts/ActiveReservationTypeContext";
import {ActiveReservationContext} from "./Contexts/ActiveReservationContext";
import {DatabaseSettingsContext} from "./Contexts/DatabaseSettingsContext";
import {MenuEditModeContext} from "./Contexts/MenuEditModeContext";
import {ConflictsContext} from "./Contexts/ConflictsContext";
import {ResolvingConflictContext} from "./Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "./Contexts/ActiveTabKeyContext";
import {DisabledDaysContext} from "./Contexts/DisabledDaysContext";
import {FetchReservationsContext} from "./Contexts/FetchReservationsContext";
import {ActiveRangeContext} from "./Contexts/ActiveRangeContext";

export default function AdminPanel(props) {
    const Menus = props.Menus,
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    Gazebos = props.Gazebos, Dinner_Settings = props.Dinner_Settings, Bed_Settings = props.Bed_Settings,
    [activeReservationsView,setActiveReservationsView] = useState('Today'),
    [reservationType,setReservationType] = useState('Dinner'),
    [editingMenu,setEditingMenu] = useState(null),
    [activeReservation,setActiveReservation] = useState(null);
    const User = props.auth.user;
    const [activeTabKey, setActiveTabKey] = useState('Reservations'),
    [activeMenusTabKey, setActiveMenusTabKey] = useState('Existing');
    const [pendingUnsavedChanges, setPendingUnsavedChanges] = useState({Dinner:false,Bed:false}),
    [showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal] = useState({Show:false,Key:''}),
    [shouldFetchReservations, setShouldFetchReservations] = useState(true),
        // A boolean to indicate if the active reservation showing fullScreen is about a conflict resolution,
        // it also stores the previous ActiveTabKey to return to after the actions are done.
    [resolvingConflict,setResolvingConflict] = useState([false,'']),
    Conflicts = [props.Disabled_Dates_Reservations,props.Disabled_Table_Reservations];

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
                return MenuContent;
            }
            case 'ResolveConflict' : {
                return <section className={'h-100 mt-4 mt-lg-0'}>
                    <ActiveRangeContext.Provider value={[null, ()=>{}]}>
                        {innerWidth < 992  ? <MobileActiveReservationOffCanvas/> : <ReservationLong></ReservationLong>}
                    </ActiveRangeContext.Provider>
                </section>;
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
            if(!bypass)
                setActiveMenusTabKey('Existing');
        setActiveTabKey(k);
    }

    const ReservationsContent = <ReservationsPanel todayReservations={props.current_day_reservations}></ReservationsPanel>,
        MenuContent = <MenuAdminPanel Menus={Menus} activeKey={{activeMenusTabKey,setActiveMenusTabKey}}></MenuAdminPanel>,
        SettingsContent = <SettingsPanel bedSettings={Bed_Settings} dinnerSettings={Dinner_Settings}></SettingsPanel>,
    typeAndViewSelectionPanel = <Row className={'p-0 w-100 d-flex flex-row mx-0 border-bottom'}>
        <Col lg={4} className={'d-flex  flex-column my-3 my-lg-0 '}>
            <ReservationTypeSelectionMenu activeTabKey={activeTabKey}></ReservationTypeSelectionMenu>
        </Col>
        <Col lg={8} className={'d-flex flex-column mt-2 mt-lg-0 text-center'}>
            <div className={'px-2 px-lg-0 px-xl-4 py-2 my-auto'}>
                {activeTabKey === 'Reservations' && <ViewSelectionMenu></ViewSelectionMenu>}
                {activeTabKey === 'Menus' && activeMenusTabKey !== 'Edit' &&
                    <h6 className={'my-3 info-text-xl'}>Διαχείριση {reservationType === 'Dinner' ? 'Βραδινών' : 'Πρωινών'} Menu </h6>}
                {activeTabKey === 'Settings' &&
                    <h6 className={'my-3 info-text-xl'}>Ρυθμίσεις {reservationType === 'Dinner' ? 'Βραδινών' : 'Πρωινών'} Κρατήσεων</h6>}
                {activeMenusTabKey === 'Edit' && activeTabKey === 'Menus' &&
                    <h6 className={'my-3 info-text-xl'}>Επεξεργασία {editingMenu?.Name}</h6>}
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
                <InnerWidthContext.Provider value={innerWidth}>
                    <GazebosContext.Provider value={Gazebos}>
                        <MenuContext.Provider value={Menus}>
                            <Container fluid className={'px-0 pt-3 pb-0 vh-100 position-absolute overflow-x-hidden overflow-y-auto scroll-bar-hidden'}>
                                <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                                    <ViewContext.Provider value={{activeReservationsView,setActiveReservationsView}}>
                                        <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                                            <ResolvingConflictContext.Provider value={{resolvingConflict,setResolvingConflict}}>
                                                <ActiveTabKeyContext.Provider value={{activeTabKey,handleSetActiveKey}}>
                                                    <ConflictsContext.Provider value={Conflicts}>
                                                        <MenuEditModeContext.Provider value={{editingMenu,setEditingMenu}}>
                                                            <DisabledDaysContext.Provider value={reservationType === 'Dinner' ? props.Disabled_Days.Dinner : props.Disabled_Days.Bed}>
                                                                <NavigationBar activeTab={{activeTabKey,handleSetActiveKey}} activeMenusTab={{activeMenusTabKey,setActiveMenusTabKey}}>
                                                                </NavigationBar>
                                                                <div className={'h-90 px-xs-5 vw-100 position-absolute overflow-hidden'}>
                                                                    <Card className={"px-2 px-lg-2 px-xxl-4 mx-sm-0 mx-lg-0 border-0 pb-2 overflow-y-auto h-100 px-sm-2"} >
                                                                        {innerWidth > 992 &&
                                                                            <Card.Header className={'text-center border-0 bg-transparent mt-xs-2 mt-lg-1 '}>
                                                                                {typeAndViewSelectionPanel}
                                                                            </Card.Header>}
                                                                        <Card.Body className={'px-0 px-lg-2 px-xl-2 rounded-4 border-0 mt-0 mt-lg-3 overflow-x-hidden py-0 d-flex flex-column'}>
                                                                            <PendingUnsavedChangesContext.Provider value={{pendingUnsavedChanges,setPendingUnsavedChanges}}>
                                                                                <ShouldShowUnsavedChangesModalContext.Provider value={{showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,handleSetActiveKey}}>
                                                                                    <FetchReservationsContext.Provider value={{shouldFetchReservations, setShouldFetchReservations}}>
                                                                                        {renderContent()}
                                                                                    </FetchReservationsContext.Provider>
                                                                                </ShouldShowUnsavedChangesModalContext.Provider>
                                                                            </PendingUnsavedChangesContext.Provider>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </div>
                                                            </DisabledDaysContext.Provider>
                                                        </MenuEditModeContext.Provider>
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
            </DatabaseSettingsContext.Provider>
        </AuthenticatedUserContext.Provider>
    )
}
