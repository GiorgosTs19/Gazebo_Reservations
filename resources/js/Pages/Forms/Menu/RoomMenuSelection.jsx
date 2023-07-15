import {Card} from "react-bootstrap";
import {useContext} from "react";
import {MenuContext} from "../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {getMenuName} from "../../../ExternalJs/Util";
import {DinnerMenu} from "./DinnerMenus/DinnerMenu";

export function RoomMenuSelection({Room,primary= false}) {
    const Menus = useContext(MenuContext),
    {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        getContent = () => {
        switch (primary) {
            case true : {
                if(bookingDetails.primary_menu.Main !== '') {
                    return getMenuName(bookingDetails.primary_menu.Main,Menus,true);
                }
                return 'Menu'
            }
            case false : {
                if(bookingDetails.secondary_menu.Main !== '') {
                    return getMenuName(bookingDetails.secondary_menu.Main,Menus,true);
                }
                return 'Menu'
            }
        }
    };
    return (
        <Card className={'my-3 border-0'}>
            <Card.Header className={'bg-transparent'}><b><i>{getContent()}</i></b> for Room {Room}</Card.Header>
            <Card.Body>
                {bookingDetails.type === 'Bed' ? '' : <DinnerMenu primary={primary}></DinnerMenu>}
            </Card.Body>
        </Card>
    )
}
