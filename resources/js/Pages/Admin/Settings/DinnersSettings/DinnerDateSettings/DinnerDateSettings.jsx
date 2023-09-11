import {Card} from "react-bootstrap";
import {CalendarSettings} from "../CalendarSettings";
import {useState} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {DateAvailability} from "./DateAvailability/DateAvailability";

export function DinnerDateSettings() {
    const [selectedDate,setSelectedDate] = useState('')
    const dateIsRange = Array.isArray(selectedDate);

    return (
        <Card className={'box_shadow mx-auto user-select-none w-100 mt-2 mt-lg-0'} >
            <Card.Header className={'bg-transparent'}>
                Διαχείριση Διαθεσιμότητας
            </Card.Header>
            <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
            <Card.Body className={'d-flex flex-column'}>
                <CalendarSettings></CalendarSettings>
            {(dateIsRange ? (selectedDate[0] !== '' && selectedDate[1] !== '' ) : selectedDate !== '' )? <DateAvailability></DateAvailability> :
                <h5 className={'my-3 text-wrap'}>Επιλέξτε { dateIsRange ? 'ένα εύρος ημερών' : ' μία ημέρα'} για να δείτε τις επιλογές σας.</h5>}
            </Card.Body>
            </SelectedDateContext.Provider>
        </Card>
    )
}


