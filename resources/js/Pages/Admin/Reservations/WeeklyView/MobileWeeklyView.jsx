import {getFormattedDate, getReservationsByDate} from "../../../../ExternalJs/Util";
import {Accordion, Button, Col, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {useContext, useEffect} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ReservationShort} from "../ReservationViews/ReservationShort";

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
                return [<ListGroup.Item key={0} className={'p-1 d-flex '}>
                    <p className={'text-muted m-auto'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια.</p>
                </ListGroup.Item>,0];

            const reservationChunks = [];
            for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
                reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
            }
            return [reservationChunks.map((chunk, index) => {
                return <ListGroup.Item key={index+1} className={'p-1 d-flex'}>
                    {chunk.map(reservation => (
                        <ReservationShort Reservation={reservation} key={reservation.id} className={'border my-3 ' + (chunk.length === 1 ? ' mx-auto' : ' mx-3')} />
                    ))}
                </ListGroup.Item>;
            }
            ),filteredReservations.length]
        };
    const [shouldShowDays,setShouldShowDays] = useState(true),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    handleBackToDays = () => {
        setShouldShowDays(true);
        setActiveReservation(null);
    };
    useEffect(()=>{
        if(activeReservation !== null)
            setShouldShowDays(false);
    },[activeReservation]);

    const renderWeekDays = () => {
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() +index);
            const [reservations,reservationsCount] = reservationsToShow(day);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            return <Accordion.Item className={'m-2 '} key={index} eventKey={index.toString()}>
                <Accordion.Header>{getFormattedDate(day,'/',3)} ( {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount,true)} )</Accordion.Header>
                <Accordion.Body>
                    <ListGroup horizontal={false} gap={5} className={'py-1'}>
                        {reservations}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>;
        })
    };
    return (
        <div className={'text-center p-0 overflow-y-auto overflow-x-hidden h-100 d-flex flex-column'}>
            <div className="navigation my-2">
                {children}
            </div>
            <FiltersBar setReservationsFilter={setReservationsFilter} direction={'horizontal'}
                reservationsFilter={reservationsFilter} className={'mx-auto'}>
            </FiltersBar>
            <Row>
                <Col lg={12} className={'p-0'}>
                    <Accordion className="week-days p-0 mx-3 overflow-auto" gap={2}>
                        {renderWeekDays()}
                    </Accordion>
                </Col>
            </Row>
        </div>
    )
}
