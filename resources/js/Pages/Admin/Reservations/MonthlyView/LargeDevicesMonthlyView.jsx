import {Col, Row, Stack} from "react-bootstrap";
import {ReservationCountNotes} from "../../../../Notes/ReservationCountNotes";
import Calendar from "react-calendar";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,WarningMessage}) {
    return (
        <Row className={'text-center'}>
            <Col lg={7} xl={5} className={'p-4 border-end'}>
                <ReservationCountNotes></ReservationCountNotes>
                {Calendar}
            </Col>
            <Col lg={5} xl={7} className={'my-3'}>
                {WarningMessage()}
                <Stack className={'h-100 p-3'} style={{overflowY:'auto',
                    maxHeight:'70vh'}}>
                    {reservationsToShow()}
                </Stack>
            </Col>
        </Row>
    )
}
