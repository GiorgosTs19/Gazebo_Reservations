import {useCallback, useContext} from "react";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {Badge, Stack} from "react-bootstrap";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function MobileCancelledView({requestProgress, cancelledReservations, reservationType, children}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    shouldShowStack = activeReservation === null;

    const reservationsToShow = useCallback(()=> {
        if(cancelledReservations.length === 0)
            return <h4 className={'text-muted my-auto info-text-lg'}>Δεν υπάρχει κάποια Ακυρωμένη κράτηση</h4>;

        const reservationsToRender = innerWidth > 800 ? 2 : 1;


            const reservationChunks = [];
            for (let i = 0; i < cancelledReservations.length; i += reservationsToRender) {
                reservationChunks.push(cancelledReservations.slice(i, i + reservationsToRender));
            }
            return reservationChunks.map((chunk, index) => (
                <div key={index} className="d-flex justify-content-center">
                    {chunk.map(reservation => (
                        <ReservationShort Reservation={reservation} key={reservation.id} className={`border mx-3 my-3 hover-scale-0_95 ${innerWidth <= 576 ? 'flex-fill mh-300px' : ''}`} />
                    ))}
                </div>
            ))

    },[cancelledReservations, innerWidth]);

    return ( <div className={'h-100 d-flex flex-column text-center'}>
            {shouldShowStack ? <>
                <Stack className={'mt-1 px-4 mx-auto text-center overflow-y-auto h-85'}>
                    {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsToShow()}
                </Stack>
            </> : <MobileActiveReservationOffCanvas/>}
        </div>
    )
}
