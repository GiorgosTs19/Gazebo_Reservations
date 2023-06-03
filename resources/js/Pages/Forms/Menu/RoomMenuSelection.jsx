import {Accordion, Card} from "react-bootstrap";
import {MenuSelection} from "./MenuSelection";
import {useContext} from "react";
import {MenuContext} from "../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {getMenuName} from "../../../ExternalJs/Util";

export function RoomMenuSelection({Room,primary= false}) {
    const Menus = useContext(MenuContext),
    {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        getContent = () => {
        switch (primary) {
            case true : {
                if(bookingDetails.primary_menu !== '') {
                    return getMenuName(bookingDetails.primary_menu,Menus);
                }
                return 'Menu'
            }
            case false : {
                if(bookingDetails.secondary_menu !== '') {
                    return getMenuName(bookingDetails.secondary_menu,Menus);
                }
                return 'Menu'
            }
        }
    };
    return (
        <Card className={'my-3'}>
            <Card.Header className={'bg-transparent'}>{getContent()} for Room {Room}</Card.Header>
            <Card.Body>
                    <Accordion>
                        {
                            Menus.map((menu,index) => {
                                return <MenuSelection menu={menu} index={index} key={menu.id} primary={primary}></MenuSelection>
                            })
                        }
                    </Accordion>
            </Card.Body>
        </Card>
    )
}
