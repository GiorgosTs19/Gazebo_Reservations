import {formatDateInGreek, getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {useContext,useState} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesTodayView} from "./LargeDevicesTodayView";
import {MobileTodayView} from "./MobileTodayView";
import {Badge} from "react-bootstrap";
import {AdminToNewReservationFormModal} from "../../Modals/AdminToNewReservationFormModal";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {useGetReservationsForDate} from "../../../../CustomHooks/useGetReservationsForDate";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function TodayView() {
    const today = new Date(),
    innerWidth = useContext(InnerWidthContext);
    const [reservationsFilter,setReservationsFilter] = useState('All'),
    {reservationType, setReservationType} = useContext(ActiveReservationTypeContext);
    const [requestProgress, reservations, setReservations] = useGetReservationsForDate(today, reservationType),
    Disabled_Days = useContext(DisabledDaysContext);
    const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(today,Disabled_Days),
        hasReservations = reservations.length > 0;
    const onlyCancelledReservationsExist = () => {
        if(reservations.length === 0)
            return false;
        const activeReservations = reservations.filter(reservation=>reservation.Status !== 'Cancelled');
        return activeReservations.length !== 0;
    }
    const getWarningMessage = () => {
        if(!onlyCancelledReservationsExist())
            return ;
        switch (existingReservationsAllowed) {
            case 1 : {
                return <h6  className={'text-warning mx-auto my-3 info-text-lg'}>
                    Οι παρακάτω κρατήσεις μπορούν να πραγματοποιηθούν.
                </h6>
            }

            case 0 : {
                return <h6  className={'text-warning mx-auto my-3 info-text-lg'}>
                    Δεν μπορούν να πραγματοποιηθούν κρατήσεις.
                    Απαιτείται μεταφορά.
                </h6>
            }
        }
    };

    return (
       <ActiveRangeContext.Provider value={[getFormattedDate(today,'-',1), setReservations]}>
           {innerWidth > 992 ?
               <LargeDevicesTodayView reservations_of_current_date={reservations} filter={{reservationsFilter,setReservationsFilter}}>
                   <h5>{formatDateInGreek(today)} {isDateDisabled && <Badge bg="danger" className={'ms-3'}>Απενεργοποιημένη</Badge>}</h5>
                   {isDateDisabled && hasReservations && getWarningMessage()}
               </LargeDevicesTodayView>
               : <MobileTodayView reservations_of_current_date={reservations} filter={{reservationsFilter,setReservationsFilter}}>
                   <h5 className={'my-2'}>{formatDateInGreek(today)}</h5>
                   {isDateDisabled &&  <Badge bg="danger" className={'mx-auto my-3'}>Απενεργοποιημένη</Badge>}
                   {isDateDisabled && hasReservations && getWarningMessage()}
                   <AdminToNewReservationFormModal returnButton reservationType={reservationType}/>
               </MobileTodayView>
           }
       </ActiveRangeContext.Provider>
    )
}
