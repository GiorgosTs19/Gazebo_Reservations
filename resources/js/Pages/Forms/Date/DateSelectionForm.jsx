import {useContext} from "react";
import {Button} from "react-bootstrap";
import {DateNotes} from "../../../Notes/DateNotes";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {changeDateFormat} from "../../../ExternalJs/Util";
import {AvailabilityNotes} from "../../../Notes/AvailabilityNotes";
import {ReservationCalendar} from "./ReservationCalendar";

export function DateSelectionForm() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        setProgress('Table');
    };
    return (
        <div className={'my-2'}>
            <div className={'border border-gray-200 rounded p-3 m-3'} style={{backgroundColor:'white'}}>
                <DateNotes></DateNotes>
                <AvailabilityNotes></AvailabilityNotes>
            </div>
            <div>
                <h5>Select a date for your Reservation</h5>
                <h6 className="mb-3 text-muted">Availability displayed underneath each day.</h6>
                <Button variant={'outline-dark'} hidden={!bookingDetails?.date} className={'mb-3'}
                        onClick={handleNextClick}>
                    Book on {changeDateFormat(bookingDetails?.date,'-','/')}
                </Button>
                <ReservationCalendar></ReservationCalendar>
            </div>
        </div>
    )
}
//
