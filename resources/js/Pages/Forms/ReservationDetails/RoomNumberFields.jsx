import {Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {checkAttendees} from "./RequirementsChecks";
export function RoomNumberFields({singleGuest = false}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handlePRNChange = (e)=>{
        // Handles the Booking's Primary Room Number field change.
        if(e.target.value.length > 4)
            return;
        setBookingDetails(prev=>{return{...prev,primary_room:e.target.value}});
    },
    handleSRNChange = (e)=>{
        // Handles the Booking's Secondary Room Number field change.
        if(e.target.value.length > 4)
            return;
        setBookingDetails(prev=>{return{...prev,secondary_room:e.target.value}});
    };
    const checkShowRequirements = ()=>{
        return bookingDetails.email.length>0 && bookingDetails.phone_number.length>0 && checkAttendees(bookingDetails);
    };

    return (
        checkShowRequirements() &&
        <>
            <p className={'bold-info-text my-md-3 mb-1'}>
                Room {bookingDetails.more_rooms ? 'numbers' : 'number'}
            </p>
            <p className={'mx-auto info-text mb-3'}>Maximum length of 4 digits</p>
            <InputGroup className={`mb-2 ${singleGuest ? 'mw-200px mx-auto' : 'd-flex'}`}>
                    <Form.Control type="number" placeholder={bookingDetails.more_rooms ? 'Room No 1' : 'Room Number'}
                                  size={"sm"} className={`mb-2 text-center box_shadow border-0 ${singleGuest ? ' mx-auto' : 'mw-100px mx-4'}`}
                                  value={bookingDetails.primary_room} onChange={handlePRNChange}/>
                {bookingDetails.more_rooms && <Form.Control type="number" placeholder={"Room No 2"} size={"sm"}
                                  className={'mb-2 text-center box_shadow border-0 mx-4 mw-100px'} value={bookingDetails.secondary_room} onChange={handleSRNChange}/>}
            </InputGroup>
        </>
    )
}
