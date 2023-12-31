import {Card} from "react-bootstrap";
import {useContext} from "react";
import {MenuContext} from "../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {getMenuName} from "../../../ExternalJs/Util";
import {DinnerMenu} from "./DinnerMenus/DinnerMenu";
import {BedPackage} from "./BedPackages/BedPackage";

export function RoomMenuSelection({Room,primary= false}) {
    const Menus = useContext(MenuContext),
    {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    getContent = () => {
        switch (bookingDetails.type) {
            case 'Dinner' : {
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
                return 'Menu';
            }
            case 'Bed' : {
                if(bookingDetails.primary_menu.Main !== '') {
                    return getMenuName(bookingDetails.primary_menu.Main,Menus,false,'Bed');
                }
                return 'Menu'
            }
        }
    };

    return (
        <Card className={'my-3 border-0 bg-transparent'}>
            <Card.Header className={'bg-transparent'}><b><i>{getContent()}</i></b> for Room {Room}</Card.Header>
            <Card.Body className={'py-1'}>
                {bookingDetails.type === 'Bed' ? <BedPackage/> : <DinnerMenu primary={primary}></DinnerMenu>}
            </Card.Body>
        </Card>
    )
}
