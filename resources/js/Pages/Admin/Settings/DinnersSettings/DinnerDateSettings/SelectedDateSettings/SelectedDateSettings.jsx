import {useContext, useEffect, useState} from "react";
import {SelectedDateContext} from "../../../../Contexts/SelectedDateContext";
import {getFormattedDate, getReservationsByDate, isDateDisabledByAdmin
} from "../../../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../../../Contexts/ReservationsContext";
import {Col, Row} from "react-bootstrap";
import {SelectedDateAvailabilitySettings} from "./SelectedDateAvailabilitySettings";

export function SelectedDateSettings() {
    const {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        SelectedReservations = useContext(ReservationsContext),
    dateIsRange = Array.isArray(selectedDate);
    const [isDateDisabled,existingReservationsAllowed] = !dateIsRange ?  isDateDisabledByAdmin(selectedDate,SelectedReservations) : [false,true];

    // Selected Dates Reservations
    // const Reservations = !dateIsRange && getReservationsByDate(selectedDate,SelectedReservations),
    // AvailabilityText = !dateIsRange &&  'Η επιλεγμένη ημέρα ' +  ((Reservations.length === 0 || Reservations === 'None' ) ? 'δεν έχει κάποια κράτηση.' :
    //     ('έχει ' + (Array.isArray(Reservations) ?
    //         Reservations.length : '') + (Reservations.length === 1 ? ' κράτηση' : ' κρατήσεις')));


    return (
        <div className={'text-center mx-auto mt-4'}>
            {/*<h5>{!dateIsRange && getFormattedDate(selectedDate,'-',2)}</h5>*/}
                <Row className={'mt-4'}>
                    <Col xs={12} className={'text-center my-4 my-lg-0 d-flex flex-column p3'}>
                        {/*Handles the selected day's availability settings. ( Setting unavailable or available )*/}
                        <SelectedDateAvailabilitySettings
                        isDateDisabled={isDateDisabled} selectedDate={selectedDate}></SelectedDateAvailabilitySettings>
                    </Col>
                </Row>
        </div>
    )
}
