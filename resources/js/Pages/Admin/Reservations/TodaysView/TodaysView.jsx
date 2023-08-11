import {formatDateInGreek, getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {useContext,useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesTodaysView} from "./LargeDevicesTodaysView";
import {MobileTodaysView} from "./MobileTodaysView";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";

export function TodaysView() {
    const today = new Date(),
    Reservations = useContext(ReservationsContext),
    innerWidth = useContext(InnerWidthContext);
    const reservations_of_current_date = getReservationsByDate(today,Reservations),
        [reservationsFilter,setReservationsFilter] = useState('All');
    const reservationsToShow = (isMobile)=> {
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto'}>Δεν υπάρχει κάποια κράτηση για σήμερα.</h4>;
        if(reservationsFilter === 'All')
            return reservations_of_current_date.map((reservation)=>{
                if(isMobile) {
                    return <ReservationShortest Reservation={reservation} key={reservation.id} className={'border'}></ReservationShortest>;
                }
                return <ReservationShort Reservation={reservation} key={reservation.id}></ReservationShort>;
            });
        const reservations = reservations_of_current_date.filter((reservation)=>{
            return reservation.Status === reservationsFilter;
        }).map((reservation,index)=>{
            if(isMobile) {
                return <ReservationShortest Reservation={reservation} key={reservation.id} className={'border'}></ReservationShortest>;
            }
            return <ReservationShort Reservation={reservation} key={reservation.id}></ReservationShort>;
        });

        if(reservations.length > 0)
            return reservations;
        return <h5 className={'my-auto text-wrap'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια.</h5>
    };

    const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(today,Reservations),
    hasReservations = Array.isArray(reservations_of_current_date) && reservations_of_current_date.length > 0;

    const getWarningMessage = () => {
        switch (existingReservationsAllowed) {
            case 1 : {
                return <h6  className={'text-warning'}>
                    Οι παρακάτω κρατήσεις μπορούν να πραγματοποιηθούν.
                </h6>
            }

            case 0 : {
                return <h6  className={'text-warning'}>
                    Οι παρακάτω κρατήσεις δεν μπορούν να πραγματοποιηθούν.
                    ΠΡΕΠΕΙ να γίνει μεταφορά τους σε άλλη μέρα.
                </h6>
            }
        }
    };

    return (
       <>
           <div className={'text-center'}>
               <h5>{formatDateInGreek(today)}</h5>
               {isDateDisabled &&  <h5 className={'text-warning'}>Έχετε θέσει την ημέρα ως μη διαθέσιμη!</h5>}
               {isDateDisabled && hasReservations && getWarningMessage()}
               {innerWidth > 992 ?
                   <LargeDevicesTodaysView reservationsToShow={reservationsToShow(false)} filter={{reservationsFilter,setReservationsFilter}}>
                   </LargeDevicesTodaysView>
                   : <MobileTodaysView reservationsToShow={reservationsToShow(true)} filter={{reservationsFilter,setReservationsFilter}}>

                   </MobileTodaysView>
               }
           </div>
       </>
    )
}
