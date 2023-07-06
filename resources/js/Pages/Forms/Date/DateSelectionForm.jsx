import {useContext} from "react";
import {Button} from "react-bootstrap";
import {DateNotes} from "../../../Notes/DateNotes";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {changeDateFormat} from "../../../ExternalJs/Util";
import {ReservationCalendar} from "./ReservationCalendar";

export function DateSelectionForm() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        setProgress('Table');
    };

    return (
        <div className={'my-1 p-1'}>
            <div className={'border-bottom border-gray-200 rounded mx-lg-auto mx-3 my-1'} style={{backgroundColor:'white',width:'fit-content'}}>
                <DateNotes></DateNotes>
                {/*<AvailabilityNotes></AvailabilityNotes>*/}
            </div>
            <div className={'mt-4'}>
                <h5>Select a date for your {bookingDetails.type === 'Bed' ? 'Sea Bed' : bookingDetails.type} Reservation</h5>
                <h6 className="mb-3 text-muted">Availability displayed underneath each day.</h6>
                <Button variant={'outline-dark rounded-5 shadow-sm'} hidden={!bookingDetails?.date} className={'mb-3'}
                        onClick={handleNextClick}>
                    Book on {changeDateFormat(bookingDetails?.date,'-','/')}
                </Button>
                <ReservationCalendar></ReservationCalendar>
            </div>
        </div>
    )
}
//
