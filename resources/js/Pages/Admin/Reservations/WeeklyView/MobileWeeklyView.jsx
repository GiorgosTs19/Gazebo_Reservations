import {
    extractReservationsForDate,
    getFormattedDate,
    isDateDisabledByAdmin
} from "../../../../ExternalJs/Util";
import {Accordion, ListGroup} from "react-bootstrap";
import {useCallback,useContext} from "react";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";

export function MobileWeeklyView({currentDate, filter, children, Reservations}) {
    const {reservationsFilter, setReservationsFilter} = filter,
        [propsReservations, setPropsReservations] = Reservations,
        {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
        {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        disabled_days = useContext(DisabledDaysContext),
        reservationsToShow = (day)=>{
            const reservations_of_current_date = extractReservationsForDate(day,propsReservations);
            if(reservations_of_current_date.length === 0)
                return [<h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>,0];

            const reservationsToRender = innerWidth >= 850 ? 2 : 1;

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
                        <ReservationShort Reservation={reservation} key={reservation.id}
                        className={'border my-3 ' + (chunk.length === 1 ? ' mx-auto' : ' mx-3')} />))
                    }
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
            const [Reservations,reservationsCount] = reservationsToShow(day);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            const [isDateDisabled,existingReservationsAllowed] = isDateDisabledByAdmin(day,disabled_days);
            return <Accordion.Item className={'m-2'} key={index} eventKey={index.toString()}>
                <Accordion.Header><span className={'me-1 mx-auto text-nowrap ' + (isDateDisabled ? 'disabled-day' : '')}>{getFormattedDate(day,'/',3) + ' '}</span> ( {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount,true) } )</Accordion.Header>
                <Accordion.Body className={'px-3'}>
                    <ListGroup horizontal={false} gap={5} className={'py-1'}>
                        {Reservations}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>;
        })
    },[currentDate,reservationsFilter,propsReservations]);

    return (
        <div className={'text-center p-0 overflow-y-auto overflow-x-hidden h-100 d-flex flex-column sticky-top bg-white'}>
            {activeReservation === null ? <>
                <div className="navigation my-2 d-flex mx-auto">
                    {children}
                </div>
                <h6>{reservationType === 'Dinner' ? 'Βραδινές Κρατήσεις' : 'Πρωινές Κρατήσεις'}</h6>
                <FiltersBar setReservationsFilter={setReservationsFilter} direction={'horizontal'}
                            reservationsFilter={reservationsFilter} className={'mx-auto my-3'}>
                </FiltersBar>
                <Accordion className="week-days p-0 mx-1 overflow-auto" gap={2}>
                        {renderWeekDays()}
                </Accordion>
            </> : <MobileActiveReservationOffCanvas/>}
        </div>
    )
}
