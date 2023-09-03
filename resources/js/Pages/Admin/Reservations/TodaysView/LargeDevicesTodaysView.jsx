import {Button, Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {useCallback, useContext, useState} from "react";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {handleCreateNewReservationForDate} from "../../../../Inertia_Requests/Admin_Requests";
import {getFormattedDate} from "../../../../ExternalJs/Util";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {AdminToNewReservationFormModal} from "../../Modals/AdminToNewReservationFormModal";

export function LargeDevicesTodaysView({reservations_of_current_date,filter,children}) {
    const {reservationsFilter,setReservationsFilter} = filter,
    [showFilters,setShowFilters] = useState(false),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);

    // Generates the reservations to show for the selected date.
    const reservationsToShow = useCallback(()=> {
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto user-select-none'}>Δεν υπάρχει κάποια κράτηση για σήμερα.</h4>;

        const filteredReservations = reservationsFilter === 'All' ?  reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return <h5 className={'my-auto text-wrap user-select-none'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια.</h5>
        const reservationsToRender = innerWidth < 1605 ? 1 : 2;
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
    },[reservations_of_current_date,reservationsFilter])
    return (
        <div className={'pe-0 pb-3 h-100 m-auto pt-4 d-flex flex-column'}>
                {children}
            <FiltersBar setReservationsFilter={setReservationsFilter}
                        reservationsFilter={reservationsFilter} direction={'horizontal'}
                        className={'mx-auto my-2'}>
            </FiltersBar>
                <AdminToNewReservationFormModal returnButton reservationType={reservationType}/>
                <Stack className={'px-3 text-center d-flex overflow-y-auto h-75'} >
                    {reservationsToShow()}
                </Stack>
        </div>
    )
}
