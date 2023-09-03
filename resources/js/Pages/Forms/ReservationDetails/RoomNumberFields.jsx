import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {checkAttendees} from "./RequirementsChecks";
export function RoomNumberFields() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handlePRNChange = (e)=>{
        // Handles the Booking's Primary Room Number field change.
        setBookingDetails({...bookingDetails,primary_room:e.target.value});
    },
    handleSRNChange = (e)=>{
        // Handles the Booking's Secondary Room Number field change.
        setBookingDetails({...bookingDetails,secondary_room:e.target.value});
    };
    const checkShowRequirements = ()=>{
        return bookingDetails.email.length>0 && bookingDetails.phone_number.length>0 && checkAttendees(bookingDetails);
    };
    return (
        checkShowRequirements() &&
        <>
            <p className={'info-text-lg'}>
                Room {bookingDetails.more_rooms ? 'numbers' : 'number'}
            </p>
            <InputGroup className="mb-3r">
                <Form.Control type="number" placeholder={"Room Number " + (bookingDetails.more_rooms ? ' 1' : '')}
                size={"sm"} className={'mb-2 text-center box_shadow border-0 mx-1'} value={bookingDetails.primary_room} onChange={handlePRNChange}/>
                {bookingDetails.more_rooms && <Form.Control type="number" placeholder={"Room Number 2"} size={"sm"}
                className={'mb-2 text-center box_shadow border-0 mx-1'} value={bookingDetails.secondary_room} onChange={handleSRNChange}/>}
            </InputGroup>
        </>
    )
}
