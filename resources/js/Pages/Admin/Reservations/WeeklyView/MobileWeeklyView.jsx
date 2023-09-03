import {getFormattedDate, getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {Accordion, Badge, Col, ListGroup, Row} from "react-bootstrap";
import {useContext, useCallback} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";

export function MobileWeeklyView({currentDate, filter, children}) {
    const Reservations = useContext(ReservationsContext),
        {reservationsFilter, setReservationsFilter} = filter,
        reservationsToShow = (day)=>{
            const reservations_of_current_date = getReservationsByDate(day,Reservations);
            if(reservations_of_current_date.length === 0)
                return [<h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>,0];

            const reservationsToRender = innerWidth > 900 ? 2 : 1;

            const filteredReservations = reservationsFilter === 'All' ? reservations_of_current_date :
                reservations_of_current_date.filter((reservation)=>{
                    return reservation.Status === reservationsFilter;
                });

            if(filteredReservations.length === 0)
                return [<ListGroup.Item key={0} className={'p-1 d-flex'}>
                    <p className={'text-muted m-auto'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια.</p>
                </ListGroup.Item>,0];

            const reservationChunks = [];
            for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
                reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
            }
            return [reservationChunks.map((chunk, index) => {
                return <ListGroup.Item key={index+1} className={'p-1 d-flex border-0 mx-auto'}>
                    {chunk.map(reservation => (
                        <ReservationShortest Reservation={reservation} key={reservation.id} className={'border my-3 ' + (chunk.length === 1 ? ' mx-auto' : ' mx-3')} />
                    ))}
                </ListGroup.Item>;
            }
            ),filteredReservations.length]
        };

    // Render days of current week. Will only be called when the currentDate changes or the filters
    const renderWeekDays = useCallback(() => {
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() +index);
            const [reservations,reservationsCount] = reservationsToShow(day);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(day,Reservations);
            return <Accordion.Item className={'m-2 '} key={index} eventKey={index.toString()}>
                <Accordion.Header><span className={' me-1 ' + (isDateDisabled ? 'disabled-day' : '')}>{getFormattedDate(day,'/',3) + ' '}</span> ( {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount,true) } )</Accordion.Header>
                <Accordion.Body>
                    <ListGroup horizontal={false} gap={5} className={'py-1'}>
                        {reservations}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>;
        })
    },[currentDate,reservationsFilter,Reservations]);

    return (
        <div className={'text-center p-0 overflow-y-auto overflow-x-hidden h-100 d-flex flex-column'}>
            <div className={'d-flex flex-column sticky-top bg-white'}>
                <div className="navigation my-2 d-flex">
                    {children}
                </div>
                <FiltersBar setReservationsFilter={setReservationsFilter} direction={'horizontal'}
                            reservationsFilter={reservationsFilter} className={'mx-auto'}>
                </FiltersBar>
            </div>
            <Row>
                <Col lg={12} className={'p-0'}>
                        <p><span className={'disabled-day'}>Ημέρα </span>: Απενεργοποιημένη Μέρα</p>
                    <Accordion className="week-days p-0 mx-3 overflow-auto" gap={2}>
                        {renderWeekDays()}
                    </Accordion>
                </Col>
            </Row>
        </div>
    )
}
