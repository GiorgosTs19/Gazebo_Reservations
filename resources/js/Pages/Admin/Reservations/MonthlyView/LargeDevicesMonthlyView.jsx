import {Col, Row, Stack} from "react-bootstrap";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {useContext} from "react";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {formatDateInGreek} from "../../../../ExternalJs/Util";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,
    reservationsFilter,setReservationsFilter, selectedDate}) {
    const [reservations, reservationsCount] = reservationsToShow(),
    {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);

    return (
        <Row className={'text-center h-100 d-flex'}>
            <Col xl={4} className={'p-1 border-end d-flex flex-column h-100'}>
                {Calendar}
            </Col>
            <Col xl={activeReservation == null ? 8 : 4} className={`d-flex flex-column h-100 pb-0 ${activeReservation ? 'border-end' : ''}`}>
                {reservationsCount > 0 && <FiltersBar direction={'horizontal'} reservationsFilter={reservationsFilter}
                             disabled={selectedDate === ''}
                             setReservationsFilter={setReservationsFilter}
                             className={'mx-auto my-3'}/>}
                {selectedDate && <h5>{formatDateInGreek(selectedDate)}</h5>}
                <h6>{reservationType === 'Dinner' ? 'Βραδινές Κρατήσεις' : 'Πρωινές Κρατήσεις'}</h6>
                <Stack className={'px-0 overflow-y-auto my-auto overflow-x-hidden'} >
                    {reservations}
                </Stack>
            </Col>
            {activeReservation !== null && <Col xl={4} className={'my-auto h-fit-content overflow-y-auto reservation-long-view py-lg-4'}>
                <ReservationLong></ReservationLong>
            </Col>}
        </Row>
    )
}
