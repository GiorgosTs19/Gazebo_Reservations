import {Accordion, Button, ListGroup} from "react-bootstrap";
import {MenuItem} from "../../Admin/Menu/MenuItem";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function MenuSelection({menu,index,primary=false}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    handleSelectMenu = (Menu) => {
        switch (primary) {
            case true : {
                setBookingDetails({...bookingDetails,primary_menu:Menu})
                break;
            }
            case false : {
                setBookingDetails({...bookingDetails,secondary_menu:Menu})
                break;
            }
        }
    },
    isSelected =  (Menu) => {
        switch (primary) {
            case true : {
                if(Menu === bookingDetails.primary_menu)
                    return 'Selected';
                return 'Select'
            }
            case false : {
                if(Menu === bookingDetails.secondary_menu)
                    return 'Selected';
                return 'Select'
            }
        }
    }
    return (
        <Accordion.Item eventKey={index} key={menu.id}>
            <Accordion.Header>{menu.Name}</Accordion.Header>
            <Accordion.Body>
                <Button variant={'outline-dark'} className={'mt-2 mb-3'}
                        onClick={()=>handleSelectMenu(menu.id)} disabled={isSelected(menu.id) === 'Selected'}>
                    {isSelected(menu.id)}
                </Button>
                <ListGroup as="ol" numbered>
                    {menu.Items.map((item)=>{
                        return <MenuItem item={item} key={item.id}></MenuItem>
                    })}
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    )
}
