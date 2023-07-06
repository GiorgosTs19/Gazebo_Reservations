import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Col, Row, Stack} from "react-bootstrap";

export function ReservationShortest({Reservation}) {
    const Rooms = Reservation.Rooms,
        NumberOfPeople = Reservation?.Attendees.length + 1,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext)
    return (
        <div className={'text-muted my-auto reservation-view p-2'}
             style={{cursor:'pointer',pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''}}
             onClick={()=>setActiveReservation(Reservation)}>
            <Row>
                <Col className={'d-flex align-items-center px-1'}>
                    <img src={'/Images/Icons/bed_icon.png'} alt={''}/>
                </Col>
                <Col className={'d-flex align-items-center text-center px-1'}>
                    <Stack>
                        {Rooms.map((room,index)=>{
                            return <span key={index}>{room.Room_Number}</span>
                        })}
                    </Stack>
                </Col>
            </Row>
        </div>
    )
}
