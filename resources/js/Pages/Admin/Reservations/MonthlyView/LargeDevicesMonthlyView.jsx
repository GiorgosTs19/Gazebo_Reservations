import {Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,
    reservationsFilter,setReservationsFilter, selectedDate}) {
    const [reservations, reservationsCount] = reservationsToShow(),
    {activeReservation, setActiveReservation} = useContext(ActiveReservationContext);

    return (
        <Row className={'text-center h-100 d-flex'}>
            <Col xl={4} className={'p-1 border-end d-flex flex-column h-100'}>
                {Calendar}
            </Col>
            <Col xl={activeReservation == null ? 8 : 4} className={'d-flex flex-column h-100 pb-0'}>
                {reservationsCount > 0 && <FiltersBar direction={'horizontal'} reservationsFilter={reservationsFilter}
                             disabled={selectedDate === ''}
                             setReservationsFilter={setReservationsFilter}
                             className={'mx-auto my-3'}/>}
                <Stack className={'px-0 overflow-y-auto my-auto'} >
                    {reservations}
                </Stack>
            </Col>
            {activeReservation !== null && <Col xl={4} className={'my-auto h-fit-content overflow-y-auto reservation-long-view py-lg-4'}>
                <ReservationLong></ReservationLong>
            </Col>}
        </Row>
    )
}
