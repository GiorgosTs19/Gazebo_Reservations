import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {created_at, getTableAA} from "../../../../ExternalJs/Util";
import {GazebosContext} from "../../../../Contexts/GazebosContext";

export function ReservationShortest({Reservation,className=''}) {
    const Confirmation_Number = Reservation.Confirmation_Number,
        Tables = useContext(GazebosContext),
        Rooms = Reservation.Rooms,
        NumberOfPeople = Reservation?.Attendees.length + 1,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const getStatusColor = () =>{
        switch (Reservation.Status) {
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
    const getStatusText = () =>{
        switch (Reservation.Status) {
            case 'Cancelled' : {
                return 'Ακυρώθηκε';
            }
            case 'Confirmed' : {
                return 'Επιβεβαιώθηκε';
            }
            default : {
                return 'Εκκρεμεί Επιβεβαίωση';
            }
        }
    };
    return (
        <div className={'text-muted my-2 p-1 rounded-2 ' + (activeReservation?.id !== Reservation.id ? 'reservation-view ' : 'active-reservation ') + className}
             style={{cursor:'pointer',width:'250px',height:'240px'}} onClick={()=>setActiveReservation(Reservation)}>
            {/*,pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''*/}
            <p className={'my-1'}>Αρ. Κράτησης : {Confirmation_Number}</p>
            {/*<p className={'my-1'}><i>Καταχωρήθηκε στις : {created_at(Reservation.Placed_At)}</i></p>*/}
            <Badge pill bg={getStatusColor().split('-')[1]} className={'my-2'}>
                {getStatusText()}
            </Badge>
            <Row className={'p-2'} >
                <Col className={'d-flex flex-column'}>
                    <h6 className={'mb-2'}>Στοιχεία Κράτησης</h6>
                    <p className={'my-2'}>
                        <span> {Rooms.length > 1 ? 'Δωμάτια : ' : 'Δωμάτιο : '}</span>
                        {/*<img src={'/Images/Icons/bed_icon.png'} alt={''}/>*/}
                        {Rooms.map((room,index)=>{
                            return <span key={index}>{index>0 && ', '} {room.Room_Number}</span>
                        })}
                    </p>
                    <p className={'my-2'}><i>Άτομα : </i>{Reservation.Attendees.length + 1}</p>
                    <p className={'my-2'}><i>Τραπέζι : </i>{getTableAA(Reservation?.Gazebo,Tables)}</p>
                </Col>
            </Row>
        </div>
    )
}
