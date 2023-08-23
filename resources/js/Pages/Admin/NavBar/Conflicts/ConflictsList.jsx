import {changeDateFormat} from "../../../../ExternalJs/Util";
import {Badge, Button, Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import useGetStatusColor from "../../../../CustomHooks/useGetStatusColor";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";

export function ConflictsList({reservations,type}) {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
        ContextReservations = useContext(ReservationsContext),
        {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
        {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);

    const handleFindReservation = (reservation) => {
        const reservationFound = ContextReservations.filter(item => {
            return item.Date === reservation.Date;
        })[0].Reservations.filter(item => {
            return item.id === reservation.id;
        })[0];
        if(reservationFound) {
            setResolvingConflict([true, activeTabKey]);
            handleSetActiveKey('ResolveConflict');
            setActiveReservation(reservationFound);
        }
    }

    const reservationsList = reservations.length > 0 ? reservations.map(reservation => {
        return <li className={'my-3'} key={reservation.id}>
            <div className={'shadow-sm'}>
                <Row>
                    <Col className={'d-flex flex-column'}>
                        <p className={'fw-bold mb-1'}>{reservation.Confirmation_Number}</p>
                        <Badge pill bg={useGetStatusColor(reservation.Status)} className={'mx-auto mb-2'}>{useGetReservationStatusText(reservation.Status)}</Badge>
                        {/*<p className={'fw-bold'}>{changeDateFormat(reservation.Date,'-')}</p>*/}
                    </Col>
                    <Col className={'d-flex'}>
                        <Button className={'m-auto p-1'} variant={'outline-secondary'} onClick={()=>handleFindReservation(reservation)}>Εμφάνιση</Button>
                    </Col>
                </Row>
            </div>
        </li>
    }) :
    <li key={0}>
        <h6>Καμία κράτηση</h6>
    </li>;

    const titles = <Row className={'text-center sticky-top bg-white'}>
            <Col>
                <h6>Πληροφορίες</h6>
            </Col>
            <Col>
                <h6>Ενέργειες</h6>
            </Col>
        </Row>;

    return (
        <>
            {reservations.length > 0 && titles}
            <ul className={'text-center ps-0 overflow-x-hidden'}>
                {reservationsList}
            </ul>
        </>
    )
}
