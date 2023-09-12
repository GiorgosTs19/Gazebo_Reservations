import {Offcanvas} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "../Reservations/ReservationViews/ReservationLong/ReservationLong";

export function MobileActiveReservationOffCanvas() {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext)
    const reservationIsNotNull = activeReservation !== null;
    return (
        <Offcanvas show={reservationIsNotNull} onHide={()=>setActiveReservation(null)} placement={'bottom'}
        style={{height:'85%', borderRadius:'30px 30px 0 0'}} className={'mx-2'}>
            <Offcanvas.Header className={'py-0'}>
                <Offcanvas.Title>{reservationIsNotNull ? activeReservation.Confimation_Number : ''}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={'d-flex px-2'}>
                {reservationIsNotNull && <ReservationLong/>}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
