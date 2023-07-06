import {useContext} from "react";
import {BookingDetailsContext} from "../Contexts/BookingDetailsContext";

export function DateNotes() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext);
    return (
        <div className={'text-center'} style={{width:'fit-content'}}>
            {bookingDetails.type === 'Dinner' && <>
                <h6 className={'text-danger'}>* Next Day reservations cannot be made after 23:00 on the previous
                    day.</h6>
                <h6 className={'text-danger '}>** Reservations made after 23:00 on any given day,
                    will only be accepted for dates occurring two days later or beyond.</h6>
            </>}
        </div>
    )
}
