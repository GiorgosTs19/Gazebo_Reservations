import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {checkAttendees} from "./RequirementsChecks";

export function ContactNameFields({singleGuest}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleLNChange = (e)=> {
        setBookingDetails(prev=> {
            return {...prev, last_name: e.target.value}
        });
    },
    handleFNChange = (e)=>{
        // Handles the Booking's First Name field change.
        setBookingDetails(prev=> {
            return {...prev, first_name: e.target.value}
        });
    };
    const inputMargin = checkAttendees(bookingDetails) && !singleGuest ? 'mx-1' : 'mx-1 mx-md-auto';
    return (
        <>
            <p className={'bold-info-text mb-2'}>Reservation's Contact</p>
            <InputGroup className="mb-3" size={"sm"}>
                <Form.Control type="text" placeholder="Last Name" size={"sm"} className={`mb-2 text-center box_shadow border-0 ${inputMargin} mw-300px`}
                              value={bookingDetails.last_name}
                              onChange={handleLNChange}/>
                <Form.Control type="text" placeholder="First Name" size={"sm"} className={`mb-2 text-center box_shadow border-0 ${inputMargin} mw-300px`}
                              value={bookingDetails.first_name}
                              onChange={handleFNChange}/>
            </InputGroup>
        </>
    )
}
