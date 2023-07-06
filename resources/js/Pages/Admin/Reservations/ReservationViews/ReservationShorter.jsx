import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Col, Row} from "react-bootstrap";

export function ReservationShorter({Reservation}) {
    const Rooms = Reservation.Rooms,
        NumberOfPeople = Reservation?.Attendees.length + 1,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        Phone = Reservation?.Contact.Phone
    return (
        <div className={'text-muted my-auto reservation-view py-2 px-0 mx-auto'}
             style={{cursor:'pointer',pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''}}
             onClick={()=>setActiveReservation(Reservation)}>
            <Row className={''}>
                <Col className={'p-0'}>
                    <p className={'p-0 mb-0 border-end text-center'}>
                        <img src={'/Images/Icons/bed_icon.png'} alt={''}/>
                        {Rooms.map((room,index)=>{
                            return <span className={'p-0'} key={index}> {room.Room_Number}</span>
                        })}
                    </p>
                </Col>
                <Col className={'d-flex border-end px-0 text-center'}>
                    <p className={'py-auto m-auto text-center'}>
                        {NumberOfPeople} &#128100;
                    </p>
                </Col>
                <Col className={'d-flex align-items-center text-center'}>
                    <p className={'py-auto mb-0'}>
                        {Phone}
                    </p>
                </Col>
            </Row>
        </div>
    )
}
