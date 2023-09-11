import {Stack} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {ReservationShort} from "../ReservationViews/ReservationShort";

export function MobileTodayView({reservations_of_current_date,filter,children}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {reservationsFilter,setReservationsFilter} = filter,
        innerWidth = useContext(InnerWidthContext);
    const shouldShowStack = activeReservation === null;

    const reservationsToShow = useCallback(()=> {
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto info-text-lg'}>Δεν υπάρχει κάποια κράτηση για σήμερα.</h4>;

        const filteredReservations = reservationsFilter === 'All' ?  reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return <h5 className={'my-auto text-wrap'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια.</h5>
        const reservationsToRender = innerWidth > 800 ? 2 : 1;
        if(innerWidth > 500) {
            const reservationChunks = [];
            for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
                reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
            }
            return reservationChunks.map((chunk, index) => (
                <div key={index} className="d-flex justify-content-center">
                    {chunk.map(reservation => (
                        <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-3 my-3 hover-scale-0_95'} />
                    ))}
                </div>
            ))
        }
        return filteredReservations.map((reservation)=> {
            return <ReservationShortest Reservation={reservation} key={reservation.id} className={'border hover-scale-0_95 my-3'}></ReservationShortest>;
        });
    },[reservations_of_current_date,reservationsFilter, shouldShowStack, innerWidth]);

    return ( <div className={'h-100 d-flex flex-column text-center'}>
            {shouldShowStack ? <>
                {children}
                {reservations_of_current_date.length > 0 &&
                    <FiltersBar setReservationsFilter={setReservationsFilter}
                                disabled={reservations_of_current_date.length === 0}
                                reservationsFilter={reservationsFilter}
                                direction={'horizontal'}
                                className={'m-auto'}></FiltersBar>}
                <Stack className={'my-3 px-4 text-center mx-auto overflow-y-auto '}>
                    {reservationsToShow()}
                </Stack>
            </> : <ReservationLong></ReservationLong>}
        </div>
    )
}