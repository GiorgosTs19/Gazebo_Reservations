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
import {SearchView} from "./SearchView/SearchView";
import {getReservationsByDate} from "../../../ExternalJs/Util";

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
        return  <h4 className={'text-muted m-auto user-select-none'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες.</h4>
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
    console.log()
    useEffect(()=>{
        setActiveReservation(null);
    },[reservationType]);
    const today = new Date(),
        today_reservations = getReservationsByDate(today,getReservationsByActiveType());

    return (
        <SettingsContext.Provider value={reservationType === 'Dinner' ? Dinner_Settings : Bed_Settings}>
            <ReservationsContext.Provider value={getReservationsByActiveType()}>
                <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                    <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                        <ViewContext.Provider value={{activeView,setActiveView}}>
                            <Card className={"px-2 mx-sm-auto mx-lg-0 mx-3 border-0 pb-2 overflow-y-auto h-100 "} >
                                <Card.Header className={'text-center border-0 bg-transparent'}>
                                        <Row className={'p-0'}>
                                            <Col lg={3} className={'d-flex box_shadow rounded-4 border ' + (isMobile ? 'border-bottom px-3 py-3 my-4' :
                                                ' border-end px-3 ')}>
                                                <ReservationTypeSelectionMenu></ReservationTypeSelectionMenu>
                                            </Col>
                                            <Col lg={9}>
                                                <ViewSelectionMenu></ViewSelectionMenu>
                                            </Col>
                                        </Row>
                                </Card.Header>
                                <Card.Body className={'box_shadow px-4 rounded-4 border border-gray-400 mt-3 ' + (innerWidth > 500 ? 'h-75' : (activeView === 'Search' ? 'h-100' : 'h-75'))}>
                                    <Row className={'my-auto h-100'}>
                                        <Col sm={12} lg={(activeReservation !== null || activeView === 'Weekly' || (activeView === 'Today' && today_reservations.length > 0)) ? 7 :12}
                                             className={'h-100 ' + (!isMobile && activeReservation !== null && 'border-end')}
                                             hidden={activeReservation !== null && isMobile && (activeView === 'Monthly' || activeView === 'Weekly' || activeView === 'Search')}>
                                            {activeView === 'Today' && <TodaysView></TodaysView>}
                                            {activeView === 'Weekly' && <WeeklyReservationsView></WeeklyReservationsView>}
                                            {activeView === 'Monthly' && <MonthlyView></MonthlyView>}
                                            {activeView === 'Search' && (isMobile ? activeReservation ===null : true) && <SearchView></SearchView>}
                                        </Col>
                                        {(activeReservation !== null || ((activeView === 'Weekly'  || (activeView === 'Today' && today_reservations.length > 0)) && innerWidth > 1200)) && <Col sm={isMobile ? 12 : 5}
                                        className={'d-flex text-center overflow-y-auto reservation-long-view'} as={'div'}>
                                            {showReservationLong()}
                                        </Col>}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </ViewContext.Provider>
                    </ActiveReservationContext.Provider>
                </ActiveReservationTypeContext.Provider>
            </ReservationsContext.Provider>
        </SettingsContext.Provider>
    )
}
