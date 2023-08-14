import {Card, Col, Row} from "react-bootstrap";

import {CalendarSettings} from "./CalendarSettings";
import {useState} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {SelectedDateSettings} from "./SelectedDateSettings/SelectedDateSettings";

export function DinnerDateSettings({DinnerReservations}) {
    const [selectedDate,setSelectedDate] = useState(''),
        [show,setShow] = useState(false);

    const handleShowChange = () => {
        setShow(!show);
    }

    return (
        <Card className={'box_shadow mx-auto'} >
            <Card.Header className={'bg-transparent'}>
                Διαχείριση Διαθεσιμότητας
            </Card.Header>
            <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
            <Card.Body className={'d-flex flex-column'}>
                <CalendarSettings DinnerReservations={DinnerReservations}></CalendarSettings>
            {selectedDate !== '' ? <SelectedDateSettings></SelectedDateSettings> :
                <h5 className={'my-5 text-wrap'}>Επιλέξτε μία ημέρα για να δείτε τις επιλογές σας.</h5>}
            </Card.Body>
            </SelectedDateContext.Provider>
        </Card>
    )
}


