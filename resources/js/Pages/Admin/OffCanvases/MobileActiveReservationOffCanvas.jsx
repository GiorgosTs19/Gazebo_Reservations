import {Offcanvas} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "../Reservations/ReservationViews/ReservationLong/ReservationLong";
import {ChevronDownSVG} from "../../../SVGS/ChevronDownSVG";

export function MobileActiveReservationOffCanvas() {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext)
    const reservationIsNotNull = activeReservation !== null;
    return (
        <Offcanvas show={reservationIsNotNull} onHide={()=>setActiveReservation(null)} placement={'bottom'}
        style={{height:'85%', borderRadius:'30px 30px 0 0'}} className={'mx-2'} backdropClassName={'reservation_backdrop'}>
            <Offcanvas.Header className={'py-0 mb-3 justify-content-center'} onClick={()=>setActiveReservation(null)}>
                <ChevronDownSVG  height={32} width={32}/>
            </Offcanvas.Header>
            <Offcanvas.Body className={'d-flex px-4 overflow-y-auto scroll-bar-hidden'}>
                {reservationIsNotNull && <ReservationLong/>}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
