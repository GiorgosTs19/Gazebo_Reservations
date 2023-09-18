import {Offcanvas} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "../Reservations/ReservationViews/ReservationLong/ReservationLong";
import {ChevronDownSVG} from "../../../SVGS/ChevronDownSVG";
import {ResolvingConflictContext} from "../Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "../Contexts/ActiveTabKeyContext";

export function MobileActiveReservationOffCanvas() {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext)
    const reservationIsNotNull = activeReservation !== null;
    const {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext);
    const {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);
    const handleBack = () => {
        if(resolvingConflict[0]) {
            handleSetActiveKey(resolvingConflict[1]);
            setResolvingConflict([false,'']);
        }
        setActiveReservation(null);
    };

    return (
        <Offcanvas show={reservationIsNotNull} onHide={handleBack} placement={'bottom'}
        style={{height:'93%', borderRadius:'30px 30px 0 0'}} className={'mx-2 d-flex'} backdropClassName={'reservation_backdrop'}>
            <Offcanvas.Header className={'py-0 mb-2 justify-content-center'} onClick={handleBack}>
                <ChevronDownSVG  height={32} width={32}/>
            </Offcanvas.Header>
            <Offcanvas.Body className={'px-4 pt-0 overflow-y-auto scroll-bar-hidden'}>
                {reservationIsNotNull && <ReservationLong/>}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
