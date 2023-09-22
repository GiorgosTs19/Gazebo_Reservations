import {LargeDevicesCancelledView} from "./LargeDevicesCancelledView";
import {MobileCancelledView} from "./MobileCancelledView";
import {useGetCancelledReservations} from "../../../../CustomHooks/useGetCancelledReservations";
import {useContext} from "react";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function CancelledView() {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        [requestProgress, reservations, ...more] = useGetCancelledReservations(reservationType, [reservationType]);
    return (
        <ActiveRangeContext.Provider value={[null, ()=>{}]}>
            {innerWidth > 992 ?
                <LargeDevicesCancelledView reservationType={reservationType} requestProgress={requestProgress} cancelledReservations={reservations}>
                    <h5>Εμφανίζονται μόνο οι ακυρωμένες {reservationType === 'Dinner' ? 'βραδινές' : 'πρωινές'} κρατήσεις</h5>
                </LargeDevicesCancelledView>
                :
                <MobileCancelledView cancelledReservations={reservations} requestProgress={requestProgress} reservationType={reservationType}>
                </MobileCancelledView>
            }
            </ActiveRangeContext.Provider>
    )
}
