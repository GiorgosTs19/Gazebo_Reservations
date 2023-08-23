import {useContext} from "react";
import {Button} from "react-bootstrap";
import {DateNotes} from "../../../Notes/DateNotes";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {changeDateFormat} from "../../../ExternalJs/Util";
import {ReservationCalendar} from "./ReservationCalendar";
import {ThemeContext} from "../../../Contexts/ThemeContext";

export function DateSelectionForm() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    Theme = useContext(ThemeContext),
    handleNextClick = ()=>{
        setProgress('Table');
    };

    return (
        <div className={'my-1 p-1'}>
            <div className={'border-bottom mx-lg-auto mx-3 my-1'} style={{width:'fit-content'}}>
                <DateNotes></DateNotes>
                {/*<AvailabilityNotes></AvailabilityNotes>*/}
            </div>
            <div className={'mt-4'}>
                <h5 className={Theme}>Select a date for your {bookingDetails.type === 'Bed' ? 'Sea Bed' : bookingDetails.type} Reservation</h5>
                <h6 className={"mb-3 opacity-75 " + Theme}>Availability displayed underneath each day.</h6>
                <ReservationCalendar></ReservationCalendar>
                <Button variant={'outline-dark rounded-5 shadow-sm reservation-button ' + Theme} hidden={!bookingDetails?.date}
                        className={'my-2 w-50'} onClick={handleNextClick}>
                    Book on {changeDateFormat(bookingDetails?.date,'-','/')}
                </Button>
            </div>
        </div>
    );
}
//
