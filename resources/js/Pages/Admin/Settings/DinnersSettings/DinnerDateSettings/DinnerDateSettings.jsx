import {Card} from "react-bootstrap";
import {CalendarSettings} from "../CalendarSettings";
import {useContext, useState} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {SelectedDateSettings} from "./SelectedDateSettings/SelectedDateSettings";
import {ReservationsContext} from "../../../../../Contexts/ReservationsContext";

export function DinnerDateSettings({DinnerReservations}) {
    const [selectedDate,setSelectedDate] = useState('')
    const dateIsRange = Array.isArray(selectedDate),
    reservations  = useContext(ReservationsContext);

    return (
        <Card className={'box_shadow mx-auto user-select-none w-100 mt-2 mt-lg-0'} >
            <Card.Header className={'bg-transparent'}>
                Διαχείριση Διαθεσιμότητας
            </Card.Header>
            <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
            <Card.Body className={'d-flex flex-column'}>
                <CalendarSettings Reservations={reservations}></CalendarSettings>
            {(dateIsRange ? (selectedDate[0] !== '' && selectedDate[1] !== '' ) : selectedDate !== '' )? <SelectedDateSettings></SelectedDateSettings> :
                <h5 className={'my-3 text-wrap'}>Επιλέξτε { dateIsRange ? 'ένα εύρος ημερών' : ' μία ημέρα'} για να δείτε τις επιλογές σας.</h5>}
            </Card.Body>
            </SelectedDateContext.Provider>
        </Card>
    )
}


