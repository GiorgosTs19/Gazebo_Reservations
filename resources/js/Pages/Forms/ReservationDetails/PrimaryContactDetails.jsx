import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function PrimaryContactDetails({requirementsCheck}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
        handleEChange = (e)=>{
            // Handles the Booking's Email field change.
            setBookingDetails({...bookingDetails,email:e.target.value});
        },
        handlePNChange = (e)=>{
            // Handles the Booking's Phone Number field change.
            setBookingDetails({...bookingDetails,phone_number:e.target.value});
        };

    return (
        <>
            {(bookingDetails.first_name.length>0 && bookingDetails.last_name.length>0 && requirementsCheck()) && <InputGroup className="mb-3">
                <Form.Control type="email" placeholder="Email" size={"sm"} className={'mb-2 text-center'}
                              value={bookingDetails.email}
                              onChange={handleEChange}/>
                <Form.Control type="text" placeholder="Phone Number" size={"sm"} className={'mb-2 text-center'}
                              value={bookingDetails.phone_number}
                              onChange={handlePNChange}/>
            </InputGroup>}
        </>
    )
}
