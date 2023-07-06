import {useContext, useEffect, useState} from "react";
import {SelectedDateContext} from "../../../../Contexts/SelectedDateContext";
import {
    getAvailabilityByDate,
    getFormattedDate,
    getTableAvailabilityBoolean,
    getTableAA, getReservationsByDate
} from "../../../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../../../Contexts/ReservationsContext";
import {Button, Col, FormSelect, Row} from "react-bootstrap";
import {GazebosContext} from "../../../../../../Contexts/GazebosContext";
import Form from 'react-bootstrap/Form';
import {Inertia} from "@inertiajs/inertia";
import {SetDayUnavailableModal} from "../../../../Modals/SetDayUnavailableModal";
import {SelectedDateTableSettings} from "./SelectedDateTableSettings";
import {SelectedDateAvailabilitySettings} from "./SelectedDateAvailabilitySettings";

export function SelectedDateSettings() {
    const {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        SelectedReservations = useContext(ReservationsContext);
    const isDateDisabled = getAvailabilityByDate(selectedDate,SelectedReservations,true),
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
        <div className={'text-center my-auto'}>
            <h5>{getFormattedDate(selectedDate,'-',2)}</h5>
            {<b className={(Reservations.length === 0 || Reservations === 'None' ) ? 'text-success' : 'text-warning'}>
                {AvailabilityText}
            </b>}
            <div className="settings-header-border mt-5 mt-xl-2">
                <h4 className="settings-heading-subtitle"><span>Επιλογές</span></h4>
                <Row>
                    <Col xs={12} lg={5} className={'text-center my-4 my-lg-0 d-flex flex-column p3'}>
                        {/*Handles the selected day's availability settings. ( Setting unavailable or available )*/}
                        <SelectedDateAvailabilitySettings Reservations={Reservations} AvailabilityText={AvailabilityText}
                        isDateDisabled={isDateDisabled} selectedDate={selectedDate}></SelectedDateAvailabilitySettings>
                    </Col>
                    <Col xs={12} lg={7} className={'text-center my-4 my-xl-0 p-2'}>
                        {/*Handles the selected day's tables availability settings. ( Setting unavailable or available )*/}
                        <SelectedDateTableSettings selectedTable={selectedTable} handleSelectTable={handleSelectTable}
                           isDateDisabled={isDateDisabled} Reservations={Reservations}></SelectedDateTableSettings>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
