import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {created_at, getTableAA} from "../../../../ExternalJs/Util";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {Inertia} from "@inertiajs/inertia";

export function ReservationShort({Reservation}) {
    const Name = Reservation.Name.First + ' ' + Reservation.Name.Last,
        ContactDetails = Reservation.Contact,
        Confirmation_Number = Reservation.Confirmation_Number,
        Rooms = Reservation.Rooms,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        Tables = useContext(GazebosContext);
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
    const handleChangeReservationStatus = (status) => {
        Inertia.patch(route('Change_Reservation_Status'),{reservation_id:Reservation.id,status:status},{
            only:[Reservation.Type === 'Dinner' ? 'Dinner_Reservations' : 'Bed_Reservations']
        });
    }
    return (
        <div className={'text-muted my-2 p-1 border rounded-2  ' + (activeReservation?.id !== Reservation.id ? 'reservation-view' : 'active-reservation')}
         style={{cursor:'pointer'}} onClick={()=>setActiveReservation(Reservation)}>
            {/*,pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''*/}
            <p className={'my-1'}>Αρ. Κράτησης : {Confirmation_Number}</p>
            <p className={'my-1'}><i>Καταχωρήθηκε στις : {created_at(Reservation.Placed_At)}</i></p>
            <Badge pill bg={getStatusColor().split('-')[1]} className={'my-2'}>
                {getStatusText()}
            </Badge>
            <Row className={'p-2'} >
                <Col className={'border border-start-0 border-top-0 border-bottom-0'}>
                    <h6 className={'mb-3'}>Στοιχεία Πελάτη</h6>
                    <p className={'my-3'}>{Name}</p>
                    <p className={'my-3 info-text'}>{ContactDetails.Email}</p>
                    <p className={'my-3 info-text'}>{ContactDetails.Phone}</p>
                </Col>
                <Col className={'d-flex flex-column'}>
                    <h6 className={'mb-2'}>Στοιχεία Κράτησης</h6>
                    <p className={'my-2'}>
                        <span> {Rooms.length > 1 ? 'Δωμάτια : ' : 'Δωμάτιο : '}</span>
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
