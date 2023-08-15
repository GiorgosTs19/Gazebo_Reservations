import {useContext, useEffect, useState} from "react";
import {SelectedDateContext} from "../../../../Contexts/SelectedDateContext";
import {getFormattedDate, isDateDisabledByAdmin
} from "../../../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../../../Contexts/ReservationsContext";
import {Col, Row} from "react-bootstrap";
import {SelectedDateTableSettings} from "./SelectedDateTableSettings";

export function SelectedDateSettings({Reservations}) {
    const {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        SelectedReservations = useContext(ReservationsContext),
    dateIsRange = Array.isArray(selectedDate);
    const [isDateDisabled,existingReservationsAllowed] = !dateIsRange ?  isDateDisabledByAdmin(selectedDate,SelectedReservations) : [false,true],
    [selectedTable,setSelectedTable] = useState(0);

    const handleSelectTable = (e) => {
        setSelectedTable(e.target.value)
    }
    useEffect(()=>{
        setSelectedTable(0) ;
    },[selectedDate]);

    // Selected Dates Reservations
    // const Reservations = !dateIsRange && getReservationsByDate(selectedDate,SelectedReservations),
    // AvailabilityText = !dateIsRange &&  'Η επιλεγμένη ημέρα ' +  ((Reservations.length === 0 || Reservations === 'None' ) ? 'δεν έχει κάποια κράτηση.' :
    //     ('έχει ' + (Array.isArray(Reservations) ?
    //         Reservations.length : '') + (Reservations.length === 1 ? ' κράτηση' : ' κρατήσεις')));


    return (
        <div className={'text-center mx-auto mt-4'}>
            <h5>{!dateIsRange && getFormattedDate(selectedDate,'-',2)}</h5>
                <Row className={'mt-4'}>
                    <Col xs={12} lg={6} className={'text-center my-4 my-xl-0 p-2'}>
                        {/*Handles the selected day's tables availability settings. ( Setting unavailable or available )*/}
                        {/*<SelectedDateTableSettings selectedTable={selectedTable} handleSelectTable={handleSelectTable}*/}
                        {/*   isDateDisabled={isDateDisabled} Reservations={Reservations}></SelectedDateTableSettings>*/}
                    </Col>
                </Row>
        </div>
    )
}
