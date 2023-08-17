import {Button, Col, Row, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";

export function MobileTodaysView({reservations_of_current_date,filter,children}) {
    const [shouldShowStack, setShouldShowStack] = useState(true),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {reservationsFilter,setReservationsFilter} = filter,
        innerWidth = useContext(InnerWidthContext),
    handleBackToStack = () =>{
        setShouldShowStack(true);
        setActiveReservation(null);
    };
    useEffect(()=>{
        if(activeReservation !== null)
            setShouldShowStack(false);
    },[activeReservation]);
    const reservationsToShow = ()=> {
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto'}>Δεν υπάρχει κάποια κράτηση για σήμερα.</h4>;

        const filteredReservations = reservationsFilter === 'All' ?  reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
            return reservation.Status === reservationsFilter;
        });

        if(filteredReservations.length === 0)
            return <h5 className={'my-auto text-wrap'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια.</h5>

        if(innerWidth > 800) {
            const reservationChunks = [];
            for (let i = 0; i < filteredReservations.length; i += 2) {
                reservationChunks.push(filteredReservations.slice(i, i + 2));
            }
            return reservationChunks.map((chunk, index) => (
                <div key={index} className="d-flex justify-content-center">
                    {chunk.map(reservation => (
                        <ReservationShortest Reservation={reservation} key={reservation.id} className={'border mx-3'} />
                    ))}
                </div>
            ))
        }
        return filteredReservations.map((reservation)=> {
            return <ReservationShortest Reservation={reservation} key={reservation.id} className={'border'}></ReservationShortest>;
        });
    };
    return (
        <>
            <Row className={'h-100'}>
                <Col md={shouldShowStack ? 3 :12} lg={3} className={'d-flex flex-column ' + (innerWidth > 700 ? 'h-100' : 'h-25 sticky-top bg-white')}>
                    {children}
                    <FiltersBar setReservationsFilter={setReservationsFilter}
                                reservationsFilter={reservationsFilter} direction={'horizontal'} className={'mx-auto'}></FiltersBar>
                </Col>
                    {shouldShowStack ?
                        <Col md={9} lg={9} className={'d-flex flex-column h-100'}>
                            <Stack className={'py-3 px-md-1 px-lg-3 text-center mx-auto overflow-y-auto h-50'}>
                                {reservationsToShow()}
                            </Stack>
                        </Col>
                        : null }

            </Row>
        </>
    )
}
