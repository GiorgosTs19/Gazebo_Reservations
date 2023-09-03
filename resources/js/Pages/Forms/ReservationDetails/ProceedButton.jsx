import {Button} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {useEffect} from "react";

export function ProceedButton() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        // Handles the click on the To Menu Selection Button
        // Sets progress to "Menu" to move forward to the MenuSelection tab
        setProgress('Menu');
    },
    checkAttendeesRequirements = (length) => {
        if(bookingDetails.number_of_people === 1)
            return true;

        const containsNoEmptyStrings = bookingDetails.attendees.every(function(element) {
            return element !== "";
        });
        if(!containsNoEmptyStrings)
            return false;
        return bookingDetails.attendees.length === length;
    },
    checkProceedRequirements = () => {
        // Checks the requirements for proceeding to the Menu Selection Tab
        switch (parseInt(bookingDetails.number_of_people)) {
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

    useEffect(()=>{
        window.addEventListener('keypress',ev => {
            if(ev.key === 'Enter') {
                if(checkProceedRequirements()){
                    handleNextClick();
                }
            }
        });
    },[]);
    return (
        <>
            {
                checkProceedRequirements() && <Button variant={'outline-light'} onClick={handleNextClick}
                  className={'box_shadow border-0 mx-auto mt-3 px-2 py-1 reservation-button text-dark'} style={{width:'fit-content'}}>
                    To Menu Selection
                </Button>
            }
        </>
    )
}
