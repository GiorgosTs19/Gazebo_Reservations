import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Badge} from "react-bootstrap";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {forwardRef, useContext} from "react";
import {getTableAA} from "../../../../ExternalJs/Util";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";
import {BellSVG} from "../../../../SVGS/BellSVG";

export const ReservationShortest = forwardRef(function ReservationShortest({Reservation,className=''}, ref) {
    const Confirmation_Number = Reservation.Confirmation_Number,
        Tables = useContext(GazebosContext),
        Rooms = Reservation.rooms,
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        [isReservationInConflict,conflictType,conflictMessage] = useCheckConflict(Reservation.id);

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

    const statusText = useGetReservationStatusText(Reservation.Status);

    return (
        <div className={`text-muted py-1 px-2 rounded-2 w-auto hover-scale-0_95 ${(activeReservation?.id !== Reservation.id ? ' reservation-view' : ' active-reservation')} ` + className}
             style={{cursor:'pointer'}} onClick={()=>setActiveReservation(Reservation)}>
            <p className={'my-1'}>
                {isReservationInConflict && <Badge pill bg={'transparent'}><BellSVG className={'text-dark mx-auto'}/></Badge>}
                <b>{Confirmation_Number}</b>
            </p>
            <Badge pill bg={getStatusColor().split('-')[1]} className={'my-2 box_shadow user-select-none'}>
                {statusText}
            </Badge>
            <section className={'d-flex flex-column text-start p-1'}>
                <h6 className={'mb-2 user-select-none text-center'}>Στοιχεία Κράτησης</h6>
                <p className={'my-1 user-select-none info-text'}>Gazebo</p>
                <p className={'my-0 user-select-none'}>Gazebo {getTableAA(Reservation?.Gazebo,Tables)}</p>
                <section className={'my-2 user-select-none'}>
                    <span className={'info-text'}> {Rooms.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</span>
                    <section>
                        {Rooms.map((room,index)=>{
                            return <span key={index}>{index>0 && ', '} {room.Room_Number}</span>
                        })}
                    </section>
                </section>
            </section>
        </div>
    )
});
