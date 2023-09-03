import {Card, Col, Row} from "react-bootstrap";
import {WeeklyReservationsView} from "./WeeklyView/WeeklyReservationsView";
import {ViewSelectionMenu} from "./Settings/ViewSelectionMenu";
import {useState} from "react";
import {MonthlyView} from "./MonthlyView/MonthlyView";
import {ViewContext} from "../../../Contexts/ViewContext";
import {useContext,useEffect} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "./ReservationViews/ReservationLong/ReservationLong";
import {TodaysView} from "./TodaysView/TodaysView";
import {ReservationsContext} from "../../../Contexts/ReservationsContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";
import {SearchView} from "./SearchView/SearchView";
import {getReservationsByDate} from "../../../ExternalJs/Util";

export function ReservationsPanel() {
    const innerWidth = useContext(InnerWidthContext),
    {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
    [isMobile,setIsMobile] = useState(innerWidth < 992),
    {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    Reservations = useContext(ReservationsContext),
    showReservationLong = () => {
        if(activeReservation !== null)
            return <ReservationLong></ReservationLong>
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
    useEffect(()=>{
        setActiveReservation(null);
    },[reservationType]);

    const today = new Date(),
        today_reservations = getReservationsByDate(today,Reservations);

    return (
        <Row className={'m-auto h-100 overflow-hidden w-100'}>
            <Col sm={12} md={activeReservation !== null ? 4 : 12} lg={(activeReservation !== null || activeReservationsView === 'Weekly' || (activeReservationsView === 'Today' && today_reservations.length > 0)) ? 7 :12}
                 className={(innerWidth < 500 ? (activeReservation === null ? 'h-100 ' : 'h-10 sticky-top bg-white ') : 'h-100 ') + (!isMobile && activeReservation !== null && ' border-end')}
                 hidden={activeReservation !== null && isMobile}>
                {activeReservationsView === 'Today' && <TodaysView></TodaysView>}
                {activeReservationsView === 'Weekly' && <WeeklyReservationsView></WeeklyReservationsView>}
                {activeReservationsView === 'Monthly' && <MonthlyView></MonthlyView>}
                {activeReservationsView === 'Search' && (isMobile ? activeReservation === null : true) && <SearchView></SearchView>}
            </Col>
            {(activeReservation !== null || ((activeReservationsView === 'Weekly'  || (activeReservationsView === 'Today' && today_reservations.length > 0)) && innerWidth > 1200)) &&
                <Col sm={12} md={8} lg={5}
            className={'d-flex text-center overflow-y-auto reservation-long-view py-lg-4'} as={'div'}>
                {showReservationLong()}
            </Col>}
        </Row>
    )
}
