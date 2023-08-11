import {Col, Row, Stack} from "react-bootstrap";
import {ReservationCountNotes} from "../../../../Notes/ReservationCountNotes";
import Calendar from "react-calendar";
import {FiltersBar} from "../FiltersBar/FiltersBar";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,WarningMessage,reservationsFilter,setReservationsFilter}) {
    const reservations = reservationsToShow();
    return (
        <Row className={'text-center'}>
            <Col lg={7} xl={5} className={'p-4 border-end d-flex flex-column'}>
                {Calendar}
            </Col>
            <Col lg={5} xl={7} className={'my-3 d-flex flex-column'}>
                <FiltersBar direction={'horizontal'} reservationsFilter={reservationsFilter}
                             setReservationsFilter={setReservationsFilter} className={'mx-auto mb-3'}></FiltersBar>
                {WarningMessage()}
                <Stack className={'h-100 p-3'} style={{overflowY:'auto',
                    maxHeight:'70vh'}}>
                    {reservations}
                </Stack>
            </Col>
        </Row>
    )
}
