import {Badge, Button, Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import useGetStatusColor from "../../../../CustomHooks/useGetStatusColor";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";
import {Inertia} from "@inertiajs/inertia";

export function ConflictsList({reservations}) {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
    {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);

    const handleFindReservation = (reservation) => {
        Inertia.get(route('Get_Reservation'),{reservation_id:reservation.id}, {onSuccess:res=>{
            const reservationFound = res.props.activeReservation;
            setResolvingConflict([true, activeTabKey]);
            handleSetActiveKey('ResolveConflict');
            setActiveReservation(reservationFound);
        }, only:['activeReservation'], preserveState:true, preserveScroll:true});
    }

    const reservationsList = reservations.length > 0 ? reservations.map(reservation => {
        return <li className={'my-3'} key={reservation.id}>
            <div className={'shadow-sm'}>
                <Row>
                    <Col className={'d-flex flex-column'}>
                        <p className={'fw-bold mb-1'}>{reservation.Confirmation_Number}</p>
                        <Badge pill bg={useGetStatusColor(reservation.Status)} className={'mx-auto mb-2'}>{useGetReservationStatusText(reservation.Status)}</Badge>
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
