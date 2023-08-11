import {useContext, useEffect, useRef} from "react";
import {BookingDetailsContext} from "../Contexts/BookingDetailsContext";
import {FormProgressContext} from "../Contexts/FormProgressContext";

export function DateNotes() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext);
    return (
        bookingDetails.type === 'Dinner' && <div className={'text-center mx-auto my-4 bg-transparent '} style={{width:'fit-content'}}
                                                 id={'date_notes'}>
                <h6 className={'reservation-note'}>* Next Day dinner reservations cannot be made after 23:00 on the previous
                    day.</h6>
                <h6 className={'reservation-note'}>** Dinner reservations made after 23:00 on any given day,
                    will only be accepted for dates occurring two days later or beyond.</h6>
        </div>
    )
}
