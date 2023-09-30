import {Badge, Col, Row, Stack} from "react-bootstrap";
import {forwardRef, useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {changeDateFormat, getDateTime, getTableAA} from "../../../../ExternalJs/Util";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import {BellSVG} from "../../../../SVGS/BellSVG";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";

export const ReservationShort = forwardRef(function ({Reservation,className} , ref) {
    const Name = Reservation.First_Name + ' ' + Reservation.Last_Name,
        Confirmation_Number = Reservation.Confirmation_Number,
        Rooms = Reservation.rooms,
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
        <div ref={ref ?? null} className={`text-muted p-1 border rounded-2 box_shadow cursor-pointer ${activeReservation?.id === Reservation.id ? '' : 'hover-scale-0_95'}
        ${innerWidth >= 576 ? 'mw-300px ' : 'mw-350px '} ${className} ${(activeReservation?.id !== Reservation.id ? ' reservation-view' : ' active-reservation')}`}
         onClick={()=>setActiveReservation(Reservation)}>
            <p className={'my-1'}>{isReservationInConflict && <Badge pill bg={'transparent'}><BellSVG className={'text-dark mx-auto'}/></Badge>}
                Αρ. Κράτησης : {Confirmation_Number}
            </p>
            <p className={'my-1 user-select-none info-text'}><i>Καταχωρήθηκε : {getDateTime(Reservation.created_at)}</i></p>
            <Stack direction={'horizontal'} className={'d-flex flex-fill'}>
                <Badge pill bg={'light'} text={'dark'} className={'mx-auto my-2 box_shadow user-select-none'}>
                    {changeDateFormat(Reservation.Date,'-')}
                </Badge>
                <Badge pill bg={getStatusColor().split('-')[1]} className={'mx-auto my-2 box_shadow user-select-none'}>
                    {status}
                </Badge>
            </Stack>
            <Row className={'p-2'} >
                <Col xs={7} md={7}>
                    <section className={`text-start`}>
                        <h6 className={'mb-1 user-select-none info-text-lg'}>Στοιχεία Πελάτη</h6>
                        <p className={'mb-0 info-text'}>Όνομα</p>
                        <p className={'my-1 text-wrap font-size-13px'}>{Name}</p>
                        <p className={'mb-0 info-text '}>Email</p>
                        <p className={'my-1 text-wrap font-size-13px'}>{Reservation.Email}</p>
                        <p className={'mb-0 info-text'}>Τηλέφωνο</p>
                        <p className={'my-1 font-size-13px'}>{Reservation.Phone_Number}</p>
                    </section>
                </Col>
                <Col className={`d-flex flex-column user-select-none`} xs={5} md={5}>
                    <section className={'text-end'}>
                        <h6 className={'mb-1 info-text-lg'}>Στοιχεία Κράτησης</h6>
                        <p className={'info-text mb-1'}>{Rooms.length > 1 ? 'Δωμάτια ' : 'Δωμάτιο '}</p>
                        <p className={'my-auto'}>
                            {Rooms.map((room,index)=>{
                                return <span key={index}>{index>0 && ', '} {room.Room_Number}</span>
                            })}
                        </p>
                        <p className={'my-auto info-text'}>Gazebo</p>
                        <p className={'my-auto'}>{getTableAA(Reservation?.gazebo_id,Tables)}</p>
                    </section>
                </Col>
            </Row>
        </div>
    )
});
