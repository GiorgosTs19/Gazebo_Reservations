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
                {/*<Row>*/}
                {/*    <Col lg={selectedDate !== '' ? 4 : 5}>*/}
                            <CalendarSettings DinnerReservations={DinnerReservations}></CalendarSettings>
                        {selectedDate !== '' ? <SelectedDateSettings></SelectedDateSettings> :
                            <h5 className={'my-auto text-wrap'}>Επιλέξτε μία ημέρα για να δείτε τις επιλογές σας.</h5>}
                    {/*</Col>*/}
                    {/*<Col lg={selectedDate !== '' ? 8 : 7} className={'d-flex flex-row mt-3 mt-lg-0 text-center'}>*/}
                    {/*   */}
                    {/*</Col>*/}
                {/*</Row>*/}
            </Card.Body>
            </SelectedDateContext.Provider>
        </Card>
    )
}


// <div className={'m-auto'}>
//     <p className={'text-danger fst-italic'}>Οι μη διαθέσιμες μέρες θα εμφανίζονται "απενεργοποιημένες"
//         στην φόρμα κρατήσεων.</p>
// </div>
// <div className={'m-auto'}>
//     <p className={'text-danger fst-italic'}>Τα μη διαθέσιμα τραπέζια, θα εμφανίζονται "απενεργοποιημένα"
//         στην φόρμα κρατήσεων για την συγκεκριμένη ημέρα.</p>
// </div>



