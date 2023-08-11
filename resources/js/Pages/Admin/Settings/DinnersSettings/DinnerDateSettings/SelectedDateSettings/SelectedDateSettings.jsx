import {useContext, useEffect, useState} from "react";
import {SelectedDateContext} from "../../../../Contexts/SelectedDateContext";
import {getFormattedDate, getReservationsByDate, isDateDisabledByAdmin
} from "../../../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../../../Contexts/ReservationsContext";
import {Card, Col, Row} from "react-bootstrap";
import {SelectedDateTableSettings} from "./SelectedDateTableSettings";
import {SelectedDateAvailabilitySettings} from "./SelectedDateAvailabilitySettings";

export function SelectedDateSettings() {
    const {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        SelectedReservations = useContext(ReservationsContext);
    const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(selectedDate,SelectedReservations),
    [selectedTable,setSelectedTable] = useState(0);

    const handleSelectTable = (e) => {
        setSelectedTable(e.target.value)
    }
    useEffect(()=>{
        setSelectedTable(0) ;
    },[selectedDate]);

    // Selected Dates Reservations
    const Reservations = getReservationsByDate(selectedDate,SelectedReservations),
    AvailabilityText = 'Η επιλεγμένη ημέρα ' +  ((Reservations.length === 0 || Reservations === 'None' ) ? 'δεν έχει κάποια κράτηση.' :
        ('έχει ' + (Array.isArray(Reservations) ?
            Reservations.length : '') + (Reservations.length === 1 ? ' κράτηση' : ' κρατήσεις')));


    return (
        <div className={'text-center mx-auto mt-4'}>
            <h5>{getFormattedDate(selectedDate,'-',2)}</h5>
            {<b className={'' + (Reservations.length === 0 || Reservations === 'None' ) ? 'text-success' : 'text-warning'}>
                {AvailabilityText}
            </b>}
                <Row className={'mt-4'}>
                    <Col xs={12} lg={6} className={'text-center my-4 my-lg-0 d-flex flex-column p3 border-end'}>
                        {/*Handles the selected day's availability settings. ( Setting unavailable or available )*/}
                        <SelectedDateAvailabilitySettings Reservations={Reservations} AvailabilityText={AvailabilityText}
                        isDateDisabled={isDateDisabled} selectedDate={selectedDate}></SelectedDateAvailabilitySettings>
                    </Col>
                    <Col xs={12} lg={6} className={'text-center my-4 my-xl-0 p-2'}>
                        {/*Handles the selected day's tables availability settings. ( Setting unavailable or available )*/}
                        <SelectedDateTableSettings selectedTable={selectedTable} handleSelectTable={handleSelectTable}
                           isDateDisabled={isDateDisabled} Reservations={Reservations}></SelectedDateTableSettings>
                    </Col>
                </Row>
        </div>
    )
}
