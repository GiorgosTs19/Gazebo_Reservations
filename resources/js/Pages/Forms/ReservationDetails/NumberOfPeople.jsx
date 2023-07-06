import {Form} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function NumberOfPeople() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
        handleNOPChange = (e)=>{
        // Handles the Number of People Select field change.
        // If the selection is not the currently selected it also resets the MoreRooms Boolean.
        let more_rooms = bookingDetails.more_rooms, attendees = bookingDetails.attendees;
        if(bookingDetails.number_of_people !== e.target.value) {
            more_rooms = false;
            attendees = []
        }
        setBookingDetails({...bookingDetails,number_of_people:parseInt(e.target.value),more_rooms:more_rooms,attendees:attendees});
    }
    return (
        <>
            <p className={'text-secondary'}>How many people will attend your reservation?</p>
            <Form.Select size="sm" defaultValue={bookingDetails.number_of_people ?? "Please Select"} className={'my-2 text-center'}
                         onChange={handleNOPChange}>
                <option hidden>Please Select</option>
                <option>1</option>
                <option>2</option>
                {bookingDetails.type === 'Dinner' &&
                    <><option>3</option>
                    <option>4</option></>
                }
            </Form.Select>
        </>
    )
}
