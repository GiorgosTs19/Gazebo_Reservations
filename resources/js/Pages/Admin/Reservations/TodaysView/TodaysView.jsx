import {formatDateInGreek, getReservationsByDate} from "../../../../ExternalJs/Util";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {useContext} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesTodaysView} from "./LargeDevicesTodaysView";
import {MobileTodaysView} from "./MobileTodaysView";

export function TodaysView() {
    const today = new Date(),
    Reservations = useContext(ReservationsContext),
    innerWidth = useContext(InnerWidthContext);

    const reservationsToShow = ()=>{
        const reservations_of_current_date = getReservationsByDate(today,Reservations);
        if(reservations_of_current_date === 'None')
            return <h4 className={'text-muted my-auto'}>Δεν υπάρχει κάποια κράτηση για σήμερα.</h4>;
        return reservations_of_current_date.map((reservation)=>{
            return <ReservationShort Reservation={reservation} key={reservation.id}></ReservationShort>;
        })
    };
    return (
       <>
           <div className={'text-center'}>
               <h5>{formatDateInGreek(today)}</h5>
               {innerWidth > 992 ?
                   <LargeDevicesTodaysView reservationsToShow={reservationsToShow}></LargeDevicesTodaysView>
                   : <MobileTodaysView reservationsToShow={reservationsToShow}></MobileTodaysView>
               }
           </div>
       </>
    )
}
