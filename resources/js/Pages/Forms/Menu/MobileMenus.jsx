import {Tab, Tabs} from "react-bootstrap";
import {RoomMenuSelection} from "./RoomMenuSelection";

export function MobileMenus({bookingDetails}) {
    return (
        bookingDetails.more_rooms ?
        <Tabs defaultActiveKey="primary" className={'mt-3 mx-auto'} fill>
            <Tab title={`Room ${bookingDetails.primary_room}`} eventKey="primary" className={'mx-auto'}>
                <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
            </Tab>
            {bookingDetails.secondary_room !== '' &&
                <Tab title={`Room ${bookingDetails.secondary_room}`} eventKey="secondary">
                    <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>
                </Tab>}
        </Tabs> :
            <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
    )
}
