import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function AttendeesNamesFields({requirementsCheck}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleAttendeeNameChange = (e, index) => {
        // Handles the Booking's bookingDetails.attendees first name fields change.
        const updatedAttendees = bookingDetails.attendees;
        updatedAttendees[index] = e.target.value;
        setBookingDetails({...bookingDetails,attendees:updatedAttendees});
    }
    return (
        <>
            {
                bookingDetails.email.length>0 && bookingDetails.phone_number.length>0 && bookingDetails.number_of_people > 1 && requirementsCheck()
                &&
                <>
                    <p className={'text-secondary'}>Please provide the first {bookingDetails.attendees.length > 1 ? 'names ' : 'name '}
                        of the additional {bookingDetails.attendees.length > 1 ? 'attendees ' : 'attendee '} accompanying you.</p>
                    <InputGroup className="mb-3">
                        {/*Return inputs for attendee's first names based on the number of people variables */}
                        {Array.from({ length:bookingDetails.number_of_people-1 }).map((_, index)=>{
                            let number = index +2;
                            return <Form.Control key={'Attendee ' + number} type="text" placeholder={"Name " + number}
                                                 size={"sm"} className={'mb-2 text-center'} value={bookingDetails.attendees[index] || ''}
                                                 onChange={(e)=>handleAttendeeNameChange(e,index)}/>
                        })}
                    </InputGroup>
                </>
            }
        </>
    )
}
