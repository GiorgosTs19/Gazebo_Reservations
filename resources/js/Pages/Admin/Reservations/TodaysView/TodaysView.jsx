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
           <div className={'text-center h-100'}>
               {innerWidth > 992 ?
                   <LargeDevicesTodaysView reservations_of_current_date={reservations_of_current_date} filter={{reservationsFilter,setReservationsFilter}}>
                       <h5>{formatDateInGreek(today)}</h5>
                       {isDateDisabled &&  <h5 className={'text-warning'}>Έχετε θέσει την ημέρα ως μη διαθέσιμη!</h5>}
                       {isDateDisabled && hasReservations && getWarningMessage()}
                   </LargeDevicesTodaysView>
                   : <MobileTodaysView reservations_of_current_date={reservations_of_current_date} filter={{reservationsFilter,setReservationsFilter}}>
                       <h5>{formatDateInGreek(today)}</h5>
                       {isDateDisabled &&  <h5 className={'text-warning'}>Έχετε θέσει την ημέρα ως μη διαθέσιμη!</h5>}
                       {isDateDisabled && hasReservations && getWarningMessage()}
                   </MobileTodaysView>
               }
           </div>
       </>
    )
}
