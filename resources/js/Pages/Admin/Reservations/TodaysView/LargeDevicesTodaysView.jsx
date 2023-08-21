import {Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {useCallback, useState} from "react";
import {ReservationShort} from "../ReservationViews/ReservationShort";

export function LargeDevicesTodaysView({reservations_of_current_date,filter,children}) {
    const {reservationsFilter,setReservationsFilter} = filter,
        [showFilters,setShowFilters] = useState(false);

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

        // Will always try to show 2 reservations per line, to save space.
        const reservationChunks = [];
        for (let i = 0; i < filteredReservations.length; i += 2) {
            reservationChunks.push(filteredReservations.slice(i, i + 2));
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
        <Row className={'pe-3 pb-3 h-100 m-auto pt-4'}>
            <Col className={'border border-1 rounded-3 flex-column justify-content-between box_shadow my-3 my-xxl-0 h-100 px-0 '
                + (reservations_of_current_date.length === 0 ? '' : ' d-flex')} hidden={reservations_of_current_date.length === 0}
                 lg={showFilters ? 2 : 1} >
                    {showFilters ? <>
                            <div className={'h-100 px-3'}>
                                <p className={'border-bottom'}>
                                    <b>Κατάσταση</b>
                                </p>
                                <FiltersBar setReservationsFilter={setReservationsFilter}
                                    reservationsFilter={reservationsFilter} direction={innerWidth > 1400 ? 'vertical' : 'horizontal'}
                                className={'h-100'}>
                                </FiltersBar>
                            </div>
                            <h6 onClick={()=>setShowFilters(false)} className={'cursor-pointer'}>
                                Απόκρυψη
                            </h6>
                        </> :
                        <div className={'h-100 d-flex flex-column'}>
                            <ExpandSVG onClick={()=>setShowFilters(true)} className={'m-auto'}></ExpandSVG>
                        </div>}
            </Col>
            <Col lg={reservations_of_current_date.length === 0 ? 12 : (showFilters ? 10 : 11)} className={'p-0 h-100'}>
                {children}
                <Stack className={'px-3 text-center d-flex overflow-y-auto h-95'} >
                    {reservationsToShow()}
                </Stack>
            </Col>
        </Row>
    )
}
