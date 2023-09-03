import {formatDateInGreek, getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {useContext,useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesTodaysView} from "./LargeDevicesTodaysView";
import {MobileTodaysView} from "./MobileTodaysView";
import {Badge} from "react-bootstrap";
import {AdminToNewReservationFormModal} from "../../Modals/AdminToNewReservationFormModal";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";

export function TodaysView() {
    const today = new Date(),
    Reservations = useContext(ReservationsContext),
    innerWidth = useContext(InnerWidthContext);
    const reservations_of_current_date = getReservationsByDate(today,Reservations),
    [reservationsFilter,setReservationsFilter] = useState('All'),
        {reservationType, setReservationType} = useContext(ActiveReservationTypeContext);


    const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(today,Reservations),
    hasReservations = Array.isArray(reservations_of_current_date) && reservations_of_current_date.length > 0;

    const getWarningMessage = () => {
        switch (existingReservationsAllowed) {
            case 1 : {
                return <h6  className={'text-warning mx-auto my-3'}>
                    Οι παρακάτω κρατήσεις μπορούν να πραγματοποιηθούν.
                </h6>
            }

            case 0 : {
                return <h6  className={'text-warning mx-auto my-3'}>
                    Δεν μπορούν να πραγματοποιηθούν κρατήσεις.
                    Απαιτείται μεταφορά.
                </h6>
            }
        }
    };

    return (
       <>
           <div className={'text-center h-100'}>
               {innerWidth > 992 ?
                   <LargeDevicesTodaysView reservations_of_current_date={reservations_of_current_date} filter={{reservationsFilter,setReservationsFilter}}>
                       <h5>{formatDateInGreek(today)} {isDateDisabled && <Badge bg="danger" className={'ms-3'}>Απενεργοποιημένη</Badge>}</h5>
                       {isDateDisabled && hasReservations && getWarningMessage()}
                   </LargeDevicesTodaysView>
                   : <MobileTodaysView reservations_of_current_date={reservations_of_current_date} filter={{reservationsFilter,setReservationsFilter}}>
                       <h5 className={'my-2'}>{formatDateInGreek(today)}</h5>
                       {isDateDisabled &&  <Badge bg="danger" className={'mx-auto my-3'}>Απενεργοποιημένη</Badge>}
                       {isDateDisabled && hasReservations && getWarningMessage()}
                       <AdminToNewReservationFormModal returnButton reservationType={reservationType}/>
                   </MobileTodaysView>
               }
           </div>
       </>
    )
}
