import {Button} from "react-bootstrap";
import {useContext} from "react";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function ProceedButton({shouldProceed}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext);
    const {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        // Handles the click on the To Menu Selection Button
        // Sets progress to "Menu" to move forward to the MenuSelection tab
        if(!shouldProceed)
            return;
        setProgress('Menu');
    };

    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    const emailChecks = emailRegex.test(bookingDetails.email);

    useEffect(()=>{
        const handleProceed = (ev) => {
            if(ev.key === 'Enter') {
                handleNextClick();
            }
        }
        window.addEventListener('keypress',handleProceed);
        return () => {
            window.removeEventListener('keypress', handleProceed);
        };
    },[]);

    return (
       <Button variant={'outline-light'} onClick={handleNextClick} disabled={!emailChecks}
          className={'border-0 mx-auto my-3 px-2 py-1 reservation-button text-dark text-nowrap w-fit-content'}>
            Menu Selection
        </Button>
    )
}
