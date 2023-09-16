import {Card} from "react-bootstrap";
import {getMenuName} from "../../../ExternalJs/Util";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {MenuContext} from "../../../Contexts/MenuContext";

export function MenusOverview({className = ''}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        Menus = useContext(MenuContext);

    const getContent = (primary) => {
        switch (bookingDetails.type) {
            case 'Dinner' : {
                switch (primary) {
                    case true : {
                        return bookingDetails.primary_room + ' : ' +
                            (bookingDetails.primary_menu.Main !== '' ? getMenuName(bookingDetails.primary_menu.Main,Menus,true) : '') +
                            ' Menu'
                            + ', ' + (bookingDetails.primary_menu.Dessert !== '' ? getMenuName(bookingDetails.primary_menu.Dessert,Menus,true):'');
                    }
                    case false : {
                        return bookingDetails.secondary_room + ' : ' +
                            (bookingDetails.secondary_menu.Main !== '' ? getMenuName(bookingDetails.secondary_menu.Main,Menus,true) : '')
                            + ' Menu'
                            + ', ' + (bookingDetails.secondary_menu.Dessert !== '' ? getMenuName(bookingDetails.secondary_menu.Dessert,Menus,true) : '')
                    }
                }
                return 'Menu';
            }
            case 'Bed' : {
                return `${bookingDetails.primary_room} : ${getMenuName(bookingDetails.primary_menu.Main,Menus,false,'Bed')}`
            }
        }
    };

    return (
        <div className={`w-fit-content ${className}`}>
            <p className={'mb-1 info-text-lg'}>Selected {bookingDetails.more_rooms ? 'Menu / Room' : 'Menu'}</p>
            <Card.Text className={'mb-2 fw-350 reservation-finalize-view-text'}>
                {getContent(true)}
            </Card.Text>
            {bookingDetails.more_rooms && bookingDetails.secondary_room !== '' && <Card.Text className={'mb-2 fw-350 reservation-finalize-view-text'}>
                {getContent(false)}
            </Card.Text>}
        </div>
    )
}
