import {Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function LargeDevicesMonthlyView({Calendar,reservationsToShow,
    reservationsFilter,setReservationsFilter, selectedDate}) {
    const [reservations, reservationsCount] = reservationsToShow(),
        {activeReservation, setActiveReservation} = useContext(ActiveReservationContext);
    return (
        <Row className={'text-center h-100'}>
            <Col xl={activeReservation == null ? 4 : 5} className={'p-4 border-end d-flex flex-column h-100'}>
                {Calendar}
            </Col>
            <Col xl={activeReservation == null ? 8 : 7} className={'d-flex flex-column h-100 pb-0'}>
                {reservationsCount > 0 && <FiltersBar direction={'horizontal'} reservationsFilter={reservationsFilter}
                             disabled={selectedDate === ''}
                             setReservationsFilter={setReservationsFilter}
                             className={'mx-auto my-3 border-secondary-subtle border rounded-4 p-2'}/>}
                {/*{WarningMessage()}*/}
                <Stack className={'px-0 overflow-y-auto monthly-reservation-stack'} >
                    {reservations}
                </Stack>
            </Col>
        </Row>
    )
}
