import {Accordion, Badge, ListGroup} from "react-bootstrap";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import {changeDateFormat} from "../../../../ExternalJs/Util";

export function ActiveReservations({dateIsRange,reservations}) {
    const renderSelectedDays = () => {
        const reservationsToShow = (day) => {
            const reservations_of_current_date = reservations.filter((reservation)=>reservation.Date === day);

            return [reservations_of_current_date.map((reservation, index) => {
                    return <ListGroup.Item key={index+1} className={'p-2 text-center my-3'}>
                        <p>Αρ. Κράτησης : {reservation.Confirmation_Number}</p>
                        <Badge pill bg={getStatusColor(reservation.Status).split('-')[1]} className={'my-3 p-2 box_shadow user-select-none'}>
                            {useGetReservationStatusText(reservation.Status)}
                        </Badge>
                    </ListGroup.Item>;
                }
            ),reservations_of_current_date.length]
        };

        const getStatusColor = (status) =>{
            switch (status) {
                case 'Cancelled' : {
                    return 'text-danger';
                }
                case 'Confirmed' : {
                    return 'text-success';
                }
                default : {
                    return 'text-warning'
                }
            }
        };
        if(dateIsRange) {
            const getDatesWithReservations = () => {
                let dates = [];
                reservations.forEach((reservation)=>{
                    if(!dates.includes(reservation.Date)) {
                        dates = [...dates,reservation.Date]
                    }
                });
                return dates;
            };


            return getDatesWithReservations().map((day,index)=>{
                const [reservationsShow,reservationsCount] = reservationsToShow(day);
                return <Accordion.Item className={'mx-2 my-4'} key={index} eventKey={index.toString()}>
                    <Accordion.Header>{changeDateFormat(day,'-','-')} ( {reservationsCount} {reservationsCount > 1 ? 'κρατήσεις' : 'κράτηση'} )</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup horizontal={false} gap={5} className={'py-1'}>
                            {reservationsShow}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>;
            });
        }

        return <Accordion.Item className={'mx-2 my-4'} key={0} eventKey={'0'}>
            <Accordion.Header>( {reservations.length} κρατήσεις )</Accordion.Header>
            <Accordion.Body>
                <ListGroup horizontal={false} gap={5} className={'py-1'}>
                    {reservations.map((reservation, index) => {
                        return <ListGroup.Item key={index+1} className={'p-2 text-center my-3'}>
                            <p>Αρ. Κράτησης : {reservation.Confirmation_Number}</p>
                            <Badge pill bg={getStatusColor(reservation.Status).split('-')[1]} className={'my-3 p-2 box_shadow user-select-none'}>
                                {useGetReservationStatusText(reservation.Status)}
                            </Badge>
                        </ListGroup.Item>;
                    })}
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>;

    };
    return (
        <div className={'overflow-auto mh-400px m-auto'}>
            <Accordion className="week-days p-0 mx-3 " gap={2}>
                {renderSelectedDays()}
            </Accordion>
        </div>
    )
}
