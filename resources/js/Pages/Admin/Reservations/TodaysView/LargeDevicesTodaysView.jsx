import {Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";

export function LargeDevicesTodaysView({reservationsToShow,filter}) {
    const {reservationsFilter,setReservationsFilter} = filter;
    return (
        <Row className={'d-flex flex-row'}>
            <Col className={'border border-1 rounded-3 d-flex flex-column'}>
                <div>
                    <p className={'border-bottom'}>
                        <b>Φίλτρα</b>
                    </p>
                    <p>Κατάσταση</p>
                    <FiltersBar setReservationsFilter={setReservationsFilter} reservationsFilter={reservationsFilter}>
                    </FiltersBar>
                </div>
            </Col>
            <Col lg={10} className={'p-0'}>
                <Stack className={'p-3 text-center'} style={{overflowY:'auto',
                    height:'70vh'}}>
                    {reservationsToShow}
                </Stack>
            </Col>
        </Row>
    )
}
