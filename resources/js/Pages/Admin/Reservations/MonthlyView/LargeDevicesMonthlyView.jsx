import {Col, Row, Stack} from "react-bootstrap";
import {ReservationCountNotes} from "../../../../Notes/ReservationCountNotes";
import Calendar from "react-calendar";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ReservationShort} from "../ReservationViews/ReservationShort";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,WarningMessage,
   reservationsFilter,setReservationsFilter, selectedDate}) {
    const reservations = reservationsToShow();
    return (
        <Row className={'text-center h-100'}>
            <Col lg={7} xl={5} className={'p-4 border-end d-flex flex-column h-100 overflow-y-auto'}>
                {Calendar}
            </Col>
            <Col lg={5} xl={7} className={'d-flex flex-column h-100 pb-0'}>
                <FiltersBar direction={'horizontal'} reservationsFilter={reservationsFilter}
                    disabled={selectedDate === ''}
                     setReservationsFilter={setReservationsFilter} className={'mx-auto mt-3'}></FiltersBar>
                {WarningMessage()}
                <Stack className={'px-3 overflow-y-auto monthly-reservation-stack '} >
                    {reservations}
                </Stack>
            </Col>
        </Row>
    )
}
