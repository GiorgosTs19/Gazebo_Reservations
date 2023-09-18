import {ViewContext} from "../../../Contexts/ViewContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";
import {WeeklyReservationsView} from "./WeeklyView/WeeklyReservationsView";
import {useState} from "react";
import {MonthlyView} from "./MonthlyView/MonthlyView";
import {useContext,useEffect} from "react";
import {TodayView} from "./TodaysView/TodayView";
import {SearchView} from "./SearchView/SearchView";
import {CancelledView} from "./CancelledView/CancelledView";

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
            {activeReservationsView === 'Cancelled' && <CancelledView></CancelledView>}
            {activeReservationsView === 'Search' && <SearchView></SearchView>}
        </>
    )
}
