import {Col, Row} from "react-bootstrap";
import {changeDateFormat, created_at} from "../../../../../ExternalJs/Util";

export function ReservationDetails({activeReservation, Attendees}) {
    const Placed_At = activeReservation.Placed_At,
    Updated_At = activeReservation.Updated_At,
    hasChanges = Placed_At !== Updated_At,
    Confirmation_Number = activeReservation?.Confirmation_Number,
    Date = changeDateFormat(activeReservation.Date, '-', '-',true);

    return (
        <Row className={'my-3 mb-lg-4 mt-xxl-2'}>
            <Col className={'border border-gray-400 mb-2 my-xxl-0 box_shadow rounded-4'} xs={12} xxl={7}>
                <p className={'p-1 my-1 user-select-none'}><i>Κράτηση <b>{activeReservation.Type === 'Dinner' ? 'Δείπνου' : 'Ξαπλώστρας'}</b> για τις {Date}</i></p>
                <p className={'p-1 my-1 user-select-none'}>για <b>{Attendees.length + 1}</b> {Attendees.length === 0 ? 'άτομο' : 'άτομα'}.</p>
                <p className={'p-1 my-1 user-select-none'}><i>Καταχωρήθηκε στις  {created_at(Placed_At)}</i></p>
                <p className={'p-1 my-1 user-select-none'}><i>Τελευταία αλλαγή : {hasChanges ? created_at(Updated_At) : '-'}</i></p>
            </Col>
            <Col className={'d-flex mt-4 mt-xxl-2 flex-column'} xs={12} xxl={5}>
                <h4 className={'border-bottom p-4 m-auto box_shadow rounded-4'}>Αρ. Κράτησης : {Confirmation_Number}</h4>
            </Col>
        </Row>
    )
}
