import {Tab, Tabs} from "react-bootstrap";
import {RoomMenuSelection} from "./RoomMenuSelection";

export function MobileMenus({bookingDetails}) {
    return (
        bookingDetails.more_rooms ?
        <Tabs defaultActiveKey="primary" className={'mt-3 mx-auto sticky-top mobile-menus-tabs'} fill >
            <Tab title={<p className={'info-text-lg mb-0'}>Room {bookingDetails.primary_room}</p>} eventKey="primary" >
                <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
            </Tab>
            {bookingDetails.secondary_room !== '' &&
                <Tab title={<p className={'info-text-lg mb-0'}>Room {bookingDetails.secondary_room}</p>} eventKey="secondary">
                    <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>
                </Tab>}
        </Tabs> :
            <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
    )
}
