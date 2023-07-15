import {Button} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";

export function ProceedButton() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        // Handles the click on the To Menu Selection Button
        // Sets progress to "Menu" to move forward to the MenuSelection tab
        setProgress('Menu');
    },
    checkAttendeesRequirements = (length) => {
        const containsNoEmptyStrings = bookingDetails.attendees.every(function(element) {
            return element !== "";
        });
        if(!containsNoEmptyStrings)
            return false;
        return bookingDetails.attendees.length === length;
    },
    checkProceedRequirements = () => {
        // Checks the requirements for proceeding to the Menu Selection Tab
        switch (bookingDetails.number_of_people) {
            case 1:
                return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                    && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== '');
            case 2:
            case 3:
            case 4:
                switch (bookingDetails.more_rooms) {
                    case null:
                        return false;
                    case true:{
                        return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0
                            && bookingDetails.primary_room !== '' && bookingDetails.secondary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1))
                    }
                    case false:
                        return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1));
                }
        }
    };
    return (
        <>
            {
                checkProceedRequirements() && <Button variant={'outline-success'} onClick={handleNextClick}
                  className={'rounded-5 shadow-sm mx-auto px-2 py-1'} style={{width:'fit-content'}}>
                    To Menu Selection
                </Button>
            }
        </>
    )
}
