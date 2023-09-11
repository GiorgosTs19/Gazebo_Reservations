import {Badge, Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {changeDateFormat, getDateTime, getTableAA} from "../../../../ExternalJs/Util";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {Inertia} from "@inertiajs/inertia";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import {BellSVG} from "../../../../SVGS/BellSVG";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";

export function ReservationShort({Reservation,className}) {
    const Name = Reservation.Name.First + ' ' + Reservation.Name.Last,
        ContactDetails = Reservation.Contact,
        Confirmation_Number = Reservation.Confirmation_Number,
        Rooms = Reservation.Rooms,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        Tables = useContext(GazebosContext);
    const [isReservationInConflict,conflictType,conflictMessage] = useCheckConflict(Reservation.id);
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
    const status = useGetReservationStatusText(Reservation.Status);

    return (
        <div className={`text-muted p-1 border rounded-2 box_shadow cursor-pointer ${activeReservation?.id === Reservation.id ? '' : 'hover-scale-0_95'} mw-350px ` + className +
            (activeReservation?.id !== Reservation.id ? ' reservation-view' : ' active-reservation')}
         onClick={()=>setActiveReservation(Reservation)}>
            {/*,pointerEvents:activeReservation?.id === Reservation.id ? 'none' : ''*/}
            <p className={'my-1'}>{isReservationInConflict && <Badge pill bg={'transparent'}><BellSVG className={'text-dark mx-auto'}/></Badge>}
                Αρ. Κράτησης : {Confirmation_Number}
            </p>
            <p className={'my-1 user-select-none info-text'}><i>Καταχωρήθηκε : {getDateTime(Reservation.Placed_At)}</i></p>
            <Row className={'p-2'} >
                <Col className={'border border-start-0 border-top-0 border-bottom-0'}>
                    <Badge pill bg={'light'} text={'dark'} className={'mb-4 mx-auto box_shadow user-select-none'}>
                        {changeDateFormat(Reservation.Date,'-')}
                    </Badge>
                    <h6 className={'mb-3 user-select-none'}>Στοιχεία Πελάτη</h6>
                    <p className={'my-3'}>{Name}</p>
                    <p className={'my-3 info-text'}>{ContactDetails.Email}</p>
                    <p className={'my-3 info-text'}>{ContactDetails.Phone}</p>
                </Col>
                <Col className={'d-flex flex-column user-select-none'}>
                    <Badge pill bg={getStatusColor().split('-')[1]} className={'mb-4 mx-auto box_shadow user-select-none'}>
                        {status}
                    </Badge>
                    <h6 className={'mb-2'}>Στοιχεία Κράτησης</h6>
                    <p className={'my-auto'}>
                        <span> {Rooms.length > 1 ? 'Δωμάτια : ' : 'Δωμάτιο : '}</span>
                        {Rooms.map((room,index)=>{
                            return <span key={index}>{index>0 && ', '} {room.Room_Number}</span>
                        })}
                    </p>
                    <p className={'my-auto'}><i>Άτομα : </i>{Reservation.Attendees.length + 1}</p>
                    <p className={'my-auto'}><i>Gazebo : </i>{getTableAA(Reservation?.Gazebo,Tables)}</p>
                </Col>
            </Row>
        </div>
    )
}
