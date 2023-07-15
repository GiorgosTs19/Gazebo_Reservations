import {Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function ReservationShort({Reservation}) {
    const Name = Reservation.Name.First + ' ' + Reservation.Name.Last,
        ContactDetails = Reservation.Contact,
        Confirmation_Number = Reservation.Confirmation_Number,
        Rooms = Reservation.Rooms,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    return (
        <div className={'text-muted my-2 p-1 border rounded-2 reservation-view ' + (activeReservation?.id === Reservation.id && 'bg-info')}
         style={{cursor:'pointer',pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''}}>
            <Row className={'p-2'} onClick={()=>setActiveReservation(Reservation)}>
                <p>Αρ. Κράτησης : {Confirmation_Number}</p>
                <Col >
                    <p><img src={'/Images/Icons/profile_icon.png'} alt={''}/> {Name}</p>
                    <p><img src={'/Images/Icons/email_icon.png'} alt={''}/> {ContactDetails.Email}</p>
                </Col>
                <Col>
                    <p>
                        {/*<span> {Rooms.length > 1 ? 'Δωμάτια : ' : 'Δωμάτιο : '}</span>*/}
                        <img src={'/Images/Icons/bed_icon.png'} alt={''}/>
                        {Rooms.map((room,index)=>{
                            return <span key={index}>{index>0 && ', '} {room.Room_Number}</span>
                        })}
                    </p>
                    <p><img src={'/Images/Icons/mobile_icon.png'} alt={''}/> {ContactDetails.Phone}</p>
                </Col>
            </Row>
        </div>
    )
}
