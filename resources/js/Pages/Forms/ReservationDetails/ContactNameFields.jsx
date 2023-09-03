import {Form, InputGroup} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function ContactNameFields() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleLNChange = (e)=> {
        setBookingDetails({...bookingDetails,last_name:e.target.value});
    },
    handleFNChange = (e)=>{
        // Handles the Booking's First Name field change.
        setBookingDetails({...bookingDetails,first_name:e.target.value});
    };

    return (
        <>
            <p className={'info-text-lg'}>Reservation's Contact</p>
            <InputGroup className="mb-3" size={"sm"}>
                <Form.Control type="text" placeholder="Last Name" size={"sm"} className={'mb-2 text-center box_shadow border-0 mx-1'}
                              value={bookingDetails.last_name}
                              onChange={handleLNChange}/>
                <Form.Control type="text" placeholder="First Name" size={"sm"} className={'mb-2 text-center box_shadow border-0 mx-1'}
                              value={bookingDetails.first_name}
                              onChange={handleFNChange}/>
            </InputGroup>
        </>
    )
}
