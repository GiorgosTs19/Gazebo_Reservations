import {Tab, Tabs} from "react-bootstrap";
import {RoomMenuSelection} from "../RoomMenuSelection";
import {FlashingTitle} from "./FlashingTitle";

export function MobileMenus({bookingDetails}) {
    const condition = bookingDetails.primary_menu.Main !== '' && bookingDetails.primary_menu.Dessert !== '' &&
        bookingDetails.secondary_menu.Main === '' || bookingDetails.secondary_menu.Dessert === '';
    return (
        bookingDetails.more_rooms ?
        <Tabs defaultActiveKey="primary" className={'mt-3 mx-auto sticky-top mobile-menus-tabs'} fill >
            <Tab title={<p className={'info-text-lg mb-0'}>Room {bookingDetails.primary_room}</p>} eventKey="primary" >
                <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
            </Tab>
            {/* When both Main and Dessert menus are selected for the primary room, the secondary's room tab will start flashing in mobile devices,
            to indicate that is has to be clicked to proceed to the menu selection for the secondary room */}
            {bookingDetails.secondary_room !== '' &&
                <Tab title={<FlashingTitle className={'info-text-lg mb-0'} style={{borderRadius:'3px 3px 0 0'}}
                conditionMet={condition}>
                    Room {bookingDetails.secondary_room}</FlashingTitle>} eventKey="secondary">
                    <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>
                </Tab>}
        </Tabs> :
            <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
    )
}
