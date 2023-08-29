import {Badge,ListGroup} from "react-bootstrap";

import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {MenuInfoModal} from "./MenuInfoModal";

export function MenuSelection({menu, index, primary=false, dessert=false, onlyOne=false}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        // Handles the selection of menus, based on the room ( primary, secondary )
        // and the type of menu ( dessert, main dishes ).
    handleSelectMenu = () => {
        if(bookingDetails.type === 'Bed') {
            setBookingDetails((prevDetails) => ({
                ...prevDetails,
                primary_menu: {
                    Main : menu.id,
                    Dessert : '',
                },
            }));
            return ;
        }
        switch (primary) {
            case true : {
                // Sets the dessert for the primary room.
                if(dessert)
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        primary_menu: {
                            ...prevDetails.primary_menu,
                            Dessert: menu.id,
                        },
                    }));
                // Sets the main dish for the primary room.
                else
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        primary_menu: {
                            ...prevDetails.primary_menu,
                            Main: menu.id,
                        },
                    }));
                break;
            }
            // Sets the dessert for the secondary room.
            case false : {
                if(dessert)
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        secondary_menu: {
                            ...prevDetails.secondary_menu,
                            Dessert: menu.id,
                        },
                    }));
                // Sets the main dish for the secondary room.
                else
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        secondary_menu: {
                            ...prevDetails.secondary_menu,
                            Main: menu.id,
                        },
                    }));
                break;
            }
        }
    },
        // Returns the current status of the list-item on the menus list. ( selected or '' ), based on the room ( primary, secondary ).
    isSelected =  () => {
        switch (primary) {
            case true : {
                if(menu.id === bookingDetails.primary_menu.Main || menu.id === bookingDetails.primary_menu.Dessert)
                    return '(Selected)';
                return '';
            }
            case false : {
                if(menu.id === bookingDetails.secondary_menu.Main || menu.id === bookingDetails.secondary_menu.Dessert)
                    return '(Selected)';
                return '';
            }
        }
    }

    // useEffect to select the only menu available ( only in the case that there is only one menu available for selection ).
    // Will only be called on the first render of the component.
    useEffect(()=>{
        if(onlyOne)
            handleSelectMenu();
    },[bookingDetails.type]);

    return (
        <ListGroup.Item eventKey={index} key={menu.id} as={'li'}
        className={"d-flex justify-content-between align-items-start border-top-0 border-end-0 border-start-0 bg-transparent " +
        (isSelected() && !dessert ? 'active' : '')}
        onClick={handleSelectMenu} disabled={onlyOne}>
            <div className="ms-2 me-auto">
                <div className={"fw-bold "}>{menu.Items.length === 1 ? menu.Items[0].Name : menu.Name} {isSelected()}</div>
            </div>
            {menu.Items.length > 1 && <MenuInfoModal menu={menu}></MenuInfoModal>}
        </ListGroup.Item>
    )
}
