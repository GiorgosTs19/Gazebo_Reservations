import {Button, Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {useCallback, useContext, useState} from "react";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {handleCreateNewReservationForDate} from "../../../../Inertia_Requests/Admin_Requests";
import {getFormattedDate} from "../../../../ExternalJs/Util";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {AdminToNewReservationFormModal} from "../../Modals/AdminToNewReservationFormModal";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";

export function LargeDevicesTodayView({reservations_of_current_date,filter,children, requestProgress}) {
    const {reservationsFilter,setReservationsFilter} = filter,
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    showReservationLong = () => {
        if(activeReservation !== null)
            return <ReservationLong></ReservationLong>
        return  <h4 className={'text-muted m-auto user-select-none info-text-xl'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες</h4>
    };

    const reservationsExist = reservations_of_current_date?.length > 0;

    // Generates the reservations to show for the selected date.
    const reservationsToShow = useCallback(()=> {
        if(!reservationsExist)
            return <h4 className={'text-muted my-auto user-select-none info-text-xl'}>Δεν υπάρχει κάποια κράτηση για σήμερα</h4>;

        const filteredReservations = reservationsFilter === 'All' ?  reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return <h5 className={'my-auto text-wrap user-select-none info-text-xl'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια</h5>
        const reservationsToRender = innerWidth < 1500 ? (activeReservation === null ? 2 : 1) : (innerWidth > 1700 ? (activeReservation === null ? 4 : 2)  : (activeReservation === null ? 3 : 2));
        // Will always try to show 2 reservations per line, to save space.
        const reservationChunks = [];
        for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
            reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
        }
        return reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation => (
                    <ReservationShort Reservation={reservation} key={reservation.id} className={'border m-3'} />
                ))}
            </div>
        ))
    },[reservations_of_current_date,reservationsFilter, reservationType, activeReservation]);

    return (
        <Row className={'h-100 w-100'}>
            <Col className={'pe-0 pb-3 h-100 m-auto pt-4 d-flex flex-column text-center'} lg={reservationsExist && activeReservation !== null ? 7 : 12}>
                {children}
                {reservationsExist && <FiltersBar setReservationsFilter={setReservationsFilter}
                  reservationsFilter={reservationsFilter} direction={'horizontal'}
                  className={'mx-auto my-2'}>
                </FiltersBar>}
                <AdminToNewReservationFormModal returnButton reservationType={reservationType}/>
                <Stack className={'px-3 text-center d-flex overflow-y-auto h-75'} >
                    {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsToShow()}
                </Stack>
            </Col>
            {reservationsExist && activeReservation !== null &&  <Col className={'h-100 d-flex flex-column overflow-y-auto text-center'} lg={5}>
                {showReservationLong()}
            </Col>}
        </Row>
    )
}
