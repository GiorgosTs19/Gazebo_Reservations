import {Badge,ListGroup} from "react-bootstrap";

import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {MenuInfoModal} from "./MenuInfoModal";

export function MenuSelection({menu, index, primary=false, dessert=false, onlyOne=false}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    handleSelectMenu = () => {
        switch (primary) {
            case true : {
                if(dessert)
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        primary_menu: {
                            ...prevDetails.primary_menu,
                            Dessert: menu.id,
                        },
                    }));
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
            case false : {
                if(dessert)
                    setBookingDetails((prevDetails) => ({
                        ...prevDetails,
                        secondary_menu: {
                            ...prevDetails.secondary_menu,
                            Dessert: menu.id,
                        },
                    }));
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

    useEffect(()=>{
        if(onlyOne)
            handleSelectMenu();
    },[]);

    return (
        <ListGroup.Item eventKey={index} key={menu.id} as={'li'}
        className={"d-flex justify-content-between align-items-start border-top-0 border-end-0 border-start-0 " +
        (isSelected() && !dessert ? 'active' : '')}
        onClick={handleSelectMenu} disabled={onlyOne}>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{menu.Items.length === 1 ? menu.Items[0].Name : menu.Name} {isSelected()}</div>
            </div>
            {menu.Items.length > 1 && <MenuInfoModal menu={menu}></MenuInfoModal>}
        </ListGroup.Item>
    )
}
