import {Form, InputGroup} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {useContext} from "react";
import {checkAttendees} from "./RequirementsChecks";

export function PrimaryContactDetails({singleGuest}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
        handleEChange = (e)=>{
            // Handles the Booking's Email field change.
            setBookingDetails(prev=>{return {...prev,email:e.target.value}});
        },
        handlePNChange = (e)=>{
            // Handles the Booking's Phone Number field change.
            setBookingDetails(prev=>{return {...prev,phone_number:e.target.value}});
        };
    const checkShowRequirements = ()=>{
        return bookingDetails.first_name.length>0 && bookingDetails.last_name.length>0;
    };
    const inputMargin = checkAttendees(bookingDetails) && !singleGuest ? 'mx-1' : 'mx-1 mx-md-auto';
    return (
        <>
            {checkShowRequirements() && <InputGroup className="mb-2">
                <Form.Control type="email" placeholder="Email" size={"sm"} className={`mb-2 text-center box_shadow border-0 ${inputMargin} mw-300px`}
                              value={bookingDetails.email}
                              onChange={handleEChange}/>
                <Form.Control type="text" placeholder="Phone Number" size={"sm"} className={`mb-2 text-center box_shadow border-0 ${inputMargin} mw-300px`}
                              value={bookingDetails.phone_number}
                              onChange={handlePNChange}/>
            </InputGroup>}
        </>
    )
}
