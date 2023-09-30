import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function AttendeesNamesFields() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleAttendeeNameChange = (e, index) => {
        // Handles the Booking's bookingDetails.attendees first name fields change.
        const updatedAttendees = bookingDetails.attendees;
        updatedAttendees[index] = e.target.value;
        setBookingDetails(prev=>{return {...prev,attendees:updatedAttendees}});
    }
    const checkShowRequirements = ()=>{
        return bookingDetails.email.length > 0 && bookingDetails.phone_number.length>0 && bookingDetails.number_of_people > 1;
    };
    return (
        checkShowRequirements() &&
        <>
            <p className={'bold-info-text mb-2'}>Guests accompanying you</p>
            <InputGroup className={`mx-auto`} style={{maxWidth:`${(bookingDetails.number_of_people-1)*250}px`}}>
                {/*Return inputs for attendee's first names based on the number of people variables */}
                {Array.from({ length:bookingDetails.number_of_people-1}).map((_, index)=>{
                    let number = index +2;
                    return <Form.Control key={'Attendee ' + number} type="text" placeholder={"Guest " + number}
                                         size={"sm"} className={`mb-2 text-center box_shadow border-0 mx-1 mw-250px `} value={bookingDetails.attendees[index] || ''}
                                         onChange={(e)=>handleAttendeeNameChange(e,index)}/>
                })}
            </InputGroup>
        </>
    )
}
