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
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={'m-auto'}
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                                fill="currentColor"
                            />
                            <path
                                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                                fill="currentColor"
                            />
                        </svg>
                        {NumberOfPeople}
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
