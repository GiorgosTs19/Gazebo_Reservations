import {getFormattedDate, getReservationsByDate} from "../../../../ExternalJs/Util";
import {Button, Col, ListGroup, Row} from "react-bootstrap";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {useContext} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function LargeDevicesWeeklyView({currentDate, getBorder,
direction,goToPreviousWeek,goToNextWeek}) {
    const Reservations = useContext(ReservationsContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    reservationsToShow = (day)=>{
        const reservations_of_current_date = getReservationsByDate(day,Reservations);
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>;
        // if(Array.isArray(reservations_of_current_date))
            return reservations_of_current_date.map((reservation,index)=>{
                return <ListGroup.Item key={index+1} className={'py-0 d-flex  ' + (activeReservation?.id === reservation.id ? 'bg-info' : '')}>
                    <ReservationShortest Reservation={reservation} key={reservation.id}></ReservationShortest>
                </ListGroup.Item>;
        })
    };
    const renderWeekDays = () => {
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() +index);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            return <ListGroup.Item className={'m-2 ' + getBorder(index) + (day < yesterday ? ' opacity-25' : '')}
                   key={index} style={{maxHeight:'100%',overflowX:'auto'}}>
                <ListGroup horizontal={'xl'} gap={5}
                           className={'p-1'}>
                    <ListGroup.Item key={0} className={'' + (isToday && 'border-info')}>
                        <h3>
                            {getFormattedDate(day,'/',3)}
                        </h3>
                    </ListGroup.Item>
                    {reservationsToShow(day)}
                </ListGroup>
            </ListGroup.Item>;
        })
    };
    return (
            <div className={'text-center p-0'} style={{overflowY: 'auto', height:'70vh'}}>
                <div className="navigation my-2">
                    <Button onClick={goToPreviousWeek} size={'sm'} className={'m-2'}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} size={'sm'} className={'m-2'}>Επόμενη Εβδομάδα</Button>
                </div>
                <Row>
                    <Col lg={12} className={'p-0'}>
                        <ListGroup horizontal={direction === 'horizontal'} className="week-days p-0 mx-3 overflow-auto d-flex " gap={2} >
                            {renderWeekDays()}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
    )
}
