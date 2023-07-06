import {getFormattedDate, getReservationsByDate} from "../../../../ExternalJs/Util";
import {Accordion, Button, Col, ListGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {useContext, useEffect} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ReservationShorter} from "../ReservationViews/ReservationShorter";

export function MobileWeeklyView({currentDate,getBorder,
direction,goToPreviousWeek,goToNextWeek}) {
    const Reservations = useContext(ReservationsContext),
        reservationsToShow = (day)=>{
            const reservations_of_current_date = getReservationsByDate(day,Reservations);
            if(reservations_of_current_date === 'None')
                return <h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>;
            return reservations_of_current_date.map((reservation,index)=>{
                return <ListGroup.Item key={index+1} className={'p-1 d-flex ' + (activeReservation?.id === reservation.id ? 'bg-info' : '')}>
                    <ReservationShorter Reservation={reservation} key={reservation.id}></ReservationShorter>
                </ListGroup.Item>;
            })
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
        const weekDays = [];
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() +index);
            const isToday = getFormattedDate(day,'/',2) === getFormattedDate(today,'/',2);
            return <Accordion.Item className={'m-2 ' + getBorder(index) + (day < yesterday ? ' opacity-25' : '')} key={index} eventKey={index.toString()}>
                <Accordion.Header>{getFormattedDate(day,'/',3)}</Accordion.Header>
                <Accordion.Body>
                    <ListGroup horizontal={false} gap={5} className={'py-1'}>
                        {reservationsToShow(day)}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>;
        })
    };
    return (
        <>
            { shouldShowDays ?
                <div className={'text-center p-0'} style={{overflowY: 'auto', height:'70vh'}}>
                    <div className="navigation my-2">
                        <Button onClick={goToPreviousWeek} size={'sm'} className={'m-2'}>Προηγούμενη Εβδομάδα</Button>
                        <Button onClick={goToNextWeek} size={'sm'} className={'m-2'}>Επόμενη Εβδομάδα</Button>
                    </div>
                    <Row>
                        <Col lg={12} className={'p-0'}>
                            <Accordion className="week-days p-0 mx-3 overflow-auto" gap={2}>
                                {renderWeekDays()}
                            </Accordion>
                        </Col>
                    </Row>
                </div>
                :
            <div className={'d-flex'}>
                <Button size={'lg'} variant={'info'} onClick={handleBackToDays} className={'my-4 mx-auto'}>
                    &#x2190;
                </Button>
            </div>
            }
        </>
    )
}
