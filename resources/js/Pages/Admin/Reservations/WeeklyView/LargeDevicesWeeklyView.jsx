import {getFormattedDate, getReservationsByDate} from "../../../../ExternalJs/Util";
import {Badge, Button, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {useContext, useMemo, useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {FiltersBar} from "../FiltersBar/FiltersBar";

export function LargeDevicesWeeklyView({currentDate, getBorder, direction, goToPreviousWeek, goToNextWeek, filter}) {
    const Reservations = useContext(ReservationsContext),
        {reservationsFilter, setReservationsFilter} = filter,
    reservationsToShow = (day)=>{
        const reservations_of_current_date = getReservationsByDate(day,Reservations);
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>;

        if(reservationsFilter === 'All')
            return reservations_of_current_date.map((reservation,index)=>{
                return <ListGroup.Item key={reservation.id+index} className={'py-0 d-flex  border border-1 rounded-2 ' +
                    (index !== reservations_of_current_date.length-1 ? ' ' : '') + (reservations_of_current_date.length > 3 ? ' mx-2' : ' mx-auto')}>
                    <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
                </ListGroup.Item>;
        });
        const reservations = reservations_of_current_date.filter((reservation)=>{
            return reservation.Status === reservationsFilter;
        }).map((reservation,index)=>{
            return <ListGroup.Item key={reservation.id+index} className={'py-0 d-flex  border border-1 rounded-2 ' +
                (index !== reservations_of_current_date.length-1 ? ' ' : '') + (reservations_of_current_date.length > 3 ? ' mx-2' : ' mx-auto')}>
                <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
            </ListGroup.Item>;
        });
        if(reservations.length>0)
            return reservations;

        return <h5 className={'text-muted m-auto'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια.</h5>
    };
    // const totalWeeksReservations = useMemo(()=>
    //     Reservations.filter((date)=>{
    //         return (new Date(date.Date).toISOString().split('T')[0] >= new Date(currentDate).toISOString().split('T')[0]
    //             && new Date(date.Date) < new Date().setDate(currentDate.getDate()+6)).forEach();
    // }),[currentDate]);

    const renderWeekDays = () => {
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() + index);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            return <ListGroup.Item className={'m-2 ' + getBorder(index) + (day < yesterday ? ' opacity-25' : '')} key={index}>
                    <Stack direction={'horizontal'} key={'Stack'}>
                            <h3 className={'me-1 border-end pe-3'}>
                                {getFormattedDate(day,'/',3)}
                            </h3>
                        <ListGroup horizontal={'xl'} gap={5} className={'p-1 scrollable-x-not-vw'} style={{overflowX:'auto'}} key={'List'}>
                            {reservationsToShow(day)}
                        </ListGroup>
                    </Stack>
                </ListGroup.Item>
            ;
        })
    };

    return (
            <div className={'text-center p-0'} >
                <div className="navigation my-2">
                    <Button onClick={goToPreviousWeek} variant={"outline-dark"} size={'sm'} className={'m-2'}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2'}>Επόμενη Εβδομάδα</Button>
                </div>
                <Row>
                    <Col className={'border border-1 rounded-3 d-flex flex-column'}>
                        <div>
                            <p className={'border-bottom'}>
                                <b>Φίλτρα</b>
                            </p>
                            <p>Κατάσταση</p>
                           <FiltersBar setReservationsFilter={setReservationsFilter} reservationsFilter={reservationsFilter}>
                           </FiltersBar>
                        </div>
                    </Col>
                    <Col lg={10} className={'p-0'}>
                        <ListGroup horizontal={direction === 'horizontal'} className="week-days p-0 mx-3 overflow-auto scrollable-y-50vh d-flex " gap={2} >
                            {renderWeekDays()}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
    )
}
