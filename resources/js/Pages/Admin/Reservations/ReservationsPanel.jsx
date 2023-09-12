import {Col, Row} from "react-bootstrap";
import {WeeklyReservationsView} from "./WeeklyView/WeeklyReservationsView";
import {useState} from "react";
import {MonthlyView} from "./MonthlyView/MonthlyView";
import {ViewContext} from "../../../Contexts/ViewContext";
import {useContext,useEffect} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "./ReservationViews/ReservationLong/ReservationLong";
import {TodayView} from "./TodaysView/TodayView";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";
import {SearchView} from "./SearchView/SearchView";

export function ReservationsPanel({todayReservations}) {
    const innerWidth = useContext(InnerWidthContext),
    {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
    [isMobile,setIsMobile] = useState(innerWidth < 992),
    {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);

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
        <>
            {activeReservationsView === 'Today' && <TodayView todayReservations={todayReservations}></TodayView>}
            {activeReservationsView === 'Weekly' && <WeeklyReservationsView></WeeklyReservationsView>}
            {activeReservationsView === 'Monthly' && <MonthlyView></MonthlyView>}
            {activeReservationsView === 'Search' && <SearchView></SearchView>}
        </>
    )
}
