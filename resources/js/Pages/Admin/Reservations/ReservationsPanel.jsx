import {Card, Col, Row} from "react-bootstrap";
import {WeeklyReservationsView} from "./WeeklyView/WeeklyReservationsView";
import {ViewSelectionMenu} from "./Settings/ViewSelectionMenu";
import {useState} from "react";
import {MonthlyView} from "./MonthlyView/MonthlyView";
import {ViewContext} from "../../../Contexts/ViewContext";
import {useContext} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {DinnerReservationLong} from "./ReservationViews/DinnerReservationLong";
import {useEffect} from "react";
import {TodaysView} from "./TodaysView/TodaysView";
import {ReservationTypeSelectionMenu} from "./Settings/ReservationTypeSelectionMenu";
import {ReservationsContext} from "../../../Contexts/ReservationsContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";
import {SettingsContext} from "../Contexts/SettingsContext";

export function ReservationsPanel({Dinner_Reservations,Bed_Reservations,Dinner_Settings,Bed_Settings}) {
    const [activeView,setActiveView] = useState('Today'),
        innerWidth = useContext(InnerWidthContext),
    [activeReservation,setActiveReservation] = useState(null),
    [isMobile,setIsMobile] = useState(innerWidth < 992),
    [reservationType,setReservationType] = useState('Dinner'),
        getReservationsByActiveType = () => {
            switch (reservationType) {
                case 'Dinner' :
                    return Dinner_Reservations;
                case 'Bed' :
                    return Bed_Reservations;
            }
        },
    showReservationLong = () => {
        if(activeReservation !== null)
            return <DinnerReservationLong></DinnerReservationLong>
        return  <h4 className={'text-muted m-auto'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες.</h4>
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(()=>{
        setActiveReservation(null);
    },[reservationType]);
    return (
        <SettingsContext.Provider value={reservationType === 'Dinner' ? Dinner_Settings : Bed_Settings}>
            <ReservationsContext.Provider value={getReservationsByActiveType()}>
                <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                    <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                        <Card className={"px-2 mx-sm-auto mx-lg-0 mx-3 border-0 pb-2 overflow-y-auto h-100 "} >
                            <Card.Header className={'text-center border-0 bg-transparent'}>
                                <ViewContext.Provider value={{activeView,setActiveView}}>
                                    <Row className={'p-0'}>
                                        <Col lg={3} className={'d-flex box_shadow rounded-4 border ' + (isMobile ? 'border-bottom px-3 py-3 my-4' :
                                            ' border-end px-3 ')}>
                                            <ReservationTypeSelectionMenu></ReservationTypeSelectionMenu>
                                        </Col>
                                        <Col lg={9}>
                                            <ViewSelectionMenu></ViewSelectionMenu>
                                        </Col>
                                    </Row>
                                </ViewContext.Provider>
                            </Card.Header>
                            <Card.Body className={'box_shadow px-4 rounded-4 border border-gray-400 mt-3 h-75'}>
                                <Row className={'my-auto h-100'}>
                                    <Col sm={12} lg={ (activeReservation !== null || activeView === 'Weekly' || activeView === 'Today') ? 7 :12}
                                         className={'h-100 ' + (!isMobile && 'border-end')} hidden={activeReservation !== null && isMobile && activeView === 'Monthly'}>
                                        {activeView === 'Today' && <TodaysView></TodaysView>}
                                        {activeView === 'Weekly' && <WeeklyReservationsView></WeeklyReservationsView>}
                                        {activeView === 'Monthly' && <MonthlyView></MonthlyView>}
                                    </Col>
                                    {(activeReservation !== null || ((activeView === 'Weekly'  || activeView === 'Today') && innerWidth > 1200)) && <Col sm={isMobile ? 12 : 5}
                                    className={'d-flex text-center overflow-y-auto reservation-long-view'} as={'div'}>
                                        {showReservationLong()}
                                    </Col>}
                                </Row>
                            </Card.Body>
                        </Card>
                    </ActiveReservationContext.Provider>
                </ActiveReservationTypeContext.Provider>
            </ReservationsContext.Provider>
        </SettingsContext.Provider>
    )
}
