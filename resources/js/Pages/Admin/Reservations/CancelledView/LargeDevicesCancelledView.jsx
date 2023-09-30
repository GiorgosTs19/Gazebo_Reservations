import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {Col, Row, Stack} from "react-bootstrap";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {useContext, useRef, useCallback} from "react";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";
import {useScrollToActiveReservation} from "../../../../CustomHooks/useScrollToActiveReservation";

export function LargeDevicesCancelledView({requestProgress, cancelledReservations, reservationType, children}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        showReservationLong = () => {
        if(activeReservation !== null)
            return <ReservationLong></ReservationLong>
        return  <h4 className={'text-muted m-auto user-select-none info-text-xl'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες</h4>
    };
    const activeReservationRef = useRef(null);
    useScrollToActiveReservation(activeReservationRef);
    const reservationsExist = cancelledReservations?.length > 0;

    const reservationsToShow = useCallback(()=> {
        if(!reservationsExist)
            return <h4 className={'text-muted my-auto user-select-none info-text-xl'}>Δεν υπάρχει κάποια ακυρωμένη {reservationType === 'Dinner' ? 'βραδινή' : 'πρωινή'} κράτηση</h4>;

        return <Row className={'overflow-x-hidden'}>
            {cancelledReservations.map((reservation) => (
                <Col className={'px-0 overflow-x-hidden'} key={reservation.id} xs={12} md={activeReservation ? 12 : 6}
                     xxl={activeReservation ? 6 : 3}>
                    <ReservationShort
                        ref={reservation.id === activeReservation?.id ? activeReservationRef : null}
                        Reservation={reservation} className={`border mx-auto my-4 ${innerWidth < 576 ? ' flex-fill' : ''}`}
                    />
                </Col>
            ))}
        </Row>
    },[cancelledReservations,reservationType, activeReservation]);

    return (
        <Row className={'h-100 w-100 d-flex'}>
            <Col className={`pe-3 pb-3 h-100 m-auto pt-4 d-flex flex-column text-center ${activeReservation ? 'border-end' : ''}`} lg={activeReservation !== null ? 7 : 12}>
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
