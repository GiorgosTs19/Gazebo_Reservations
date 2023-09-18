import {Col, Row} from "react-bootstrap";
import {RoomMenuSelection} from "./RoomMenuSelection";
import {checkMenus} from "../ReservationDetails/RequirementsChecks";

export function LargeDevicesMenus({bookingDetails}) {
    return (
        <Row>
            {/*Show this message only if a menu is not selected for each room.*/}
            {!checkMenus(bookingDetails) && <p className={'text-dark mb-0 mt-3 info-text-lg'}>{bookingDetails.more_rooms ? 'Select a Menu for each Room' : 'Select a Menu'}</p>}
            <Col>
                <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
            </Col>
            {bookingDetails.secondary_room !== '' && <Col>
                <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>
            </Col>}
        </Row>
    )
}
