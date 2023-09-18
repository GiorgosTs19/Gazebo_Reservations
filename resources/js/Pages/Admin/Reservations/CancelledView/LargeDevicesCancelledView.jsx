import {Col, Row, Stack} from "react-bootstrap";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {useCallback} from "react";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";

export function LargeDevicesCancelledView({requestProgress, cancelledReservations, reservationType, children}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        showReservationLong = () => {
        if(activeReservation !== null)
            return <ReservationLong></ReservationLong>
        return  <h4 className={'text-muted m-auto user-select-none info-text-xl'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες</h4>
    };

    const reservationsExist = cancelledReservations?.length > 0;

    const reservationsToShow = useCallback(()=> {
        if(!reservationsExist)
            return <h4 className={'text-muted my-auto user-select-none info-text-xl'}>Δεν υπάρχει κάποια ακυρωμένη κράτηση</h4>;

        const reservationsToRender = innerWidth < 1500 ? (activeReservation === null ? 2 : 1) : (innerWidth > 1700 ? (activeReservation === null ? 4 : 2)  : (activeReservation === null ? 3 : 2));
        // Will always try to show 2 reservations per line, to save space.
        const reservationChunks = [];
        for (let i = 0; i < cancelledReservations.length; i += reservationsToRender) {
            reservationChunks.push(cancelledReservations.slice(i, i + reservationsToRender));
        }
        return reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation => (
                    <ReservationShort Reservation={reservation} key={reservation.id} className={`border m-3 ${innerWidth <= 576 ? ' flex-fill' : ''}`} />
                ))}
            </div>
        ))
    },[cancelledReservations,reservationType, activeReservation]);

    return (
        <Row className={'h-100 w-100 d-flex'}>
            <Col className={'pe-0 pb-3 h-100 m-auto pt-4 d-flex flex-column text-center'} lg={activeReservation !== null ? 7 : 12}>
                {children}
                <Stack className={'px-3 text-center d-flex overflow-y-auto h-75'} >
                    {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsToShow()}
                </Stack>
            </Col>
            {activeReservation !== null &&  <Col className={'m-auto p-4 overflow-y-auto text-center'} lg={5}>
                {showReservationLong()}
            </Col>}
        </Row>
    )
}
