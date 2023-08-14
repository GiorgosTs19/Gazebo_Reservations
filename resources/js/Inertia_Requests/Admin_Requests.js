import {Inertia} from "@inertiajs/inertia";

export const handleChangeReservationStatus = (status, {activeReservation,setActiveReservation}) => {
    Inertia.patch(route('Change_Reservation_Status'),{reservation_id:activeReservation.id,status:status},{
        onSuccess:(res)=> {
            console.log('res',res.props.activeReservation)
            setActiveReservation(res.props.activeReservation);
        },
        only:activeReservation.Type === 'Dinner' ? ['Dinner_Reservations','activeReservation'] : ['Bed_Reservations','activeReservation']
    });
}
