import {formatDateInGreek, getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {useContext,useState} from "react";
import {LargeDevicesTodayView} from "./LargeDevicesTodayView";
import {MobileTodayView} from "./MobileTodayView";
import {useGetReservationsForToday} from "../../../../CustomHooks/useGetReservationsForToday";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {Badge} from "react-bootstrap";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function TodayView({todayReservations}) {
    const today = new Date(),
    innerWidth = useContext(InnerWidthContext);
    const [reservationsFilter,setReservationsFilter] = useState('All'),
    {reservationType, setReservationType} = useContext(ActiveReservationTypeContext);
    const [requestProgress, reservations, setReservations] = useGetReservationsForToday(todayReservations, reservationType, [reservationType]);
    const Disabled_Days = useContext(DisabledDaysContext);
    const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(today,Disabled_Days);

    // const onlyCancelledReservationsExist = () => {
    //     if(reservations?.length === 0)
    //         return false;
    //     const activeReservations = reservations?.filter(reservation=>reservation.Status !== 'Cancelled');
    //     return activeReservations.length !== 0;
    // }

    return (
       <ActiveRangeContext.Provider value={[getFormattedDate(today,'-',1), setReservations]}>
           {innerWidth > 992 ?
               <LargeDevicesTodayView reservations_of_current_date={reservations} filter={{reservationsFilter,setReservationsFilter}}
               requestProgress={requestProgress}>
                   <h5>{formatDateInGreek(today)}</h5>
                   {isDateDisabled && <Badge bg="danger" className={'mx-auto p-2 my-2'}>Απενεργοποιημένη για {reservationType === 'Dinner' ? 'Βραδινές' : 'Πρωινές'} κρατήσεις</Badge>}
               </LargeDevicesTodayView>
               : <MobileTodayView reservations_of_current_date={reservations} filter={{reservationsFilter,setReservationsFilter}}
                requestProgress={requestProgress} dateDisabled={[isDateDisabled,existingReservationsAllowed]}>
                       <h5 className={'m-auto'}>{formatDateInGreek(today)}</h5>
               </MobileTodayView>
           }
       </ActiveRangeContext.Provider>
    )
}
