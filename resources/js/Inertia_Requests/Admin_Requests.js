import {Inertia} from "@inertiajs/inertia";

export const handleChangeReservationStatus = (status, {activeReservation,setActiveReservation}) => {
    Inertia.patch(route('Change_Reservation_Status'),{reservation_id:activeReservation.id,status:status},{
        onSuccess:(res)=> {
            setActiveReservation(res.props.activeReservation);
        },
        only:activeReservation.Type === 'Dinner' ? ['Dinner_Reservations','activeReservation'] : ['Bed_Reservations','activeReservation']
    });
}

export const handleCreateNewReservationForDate = (date, type, people) => {
    if(!date || !type)
        return;
    Inertia.get(route('Show.Gazebo.Reservation.Form'),{selectedDate:date, selectedType:type, selectedPeople:people});
}
