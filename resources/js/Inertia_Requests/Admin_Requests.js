import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";
export const getParameter = (activeRange) => {
    if(!activeRange)
        return '';
    if(Array.isArray(activeRange))
        return 'availability_for_date_range';
    return 'current_day_reservations';
}

export const handleSetReservations = (res, activeRange, setReservations, activeView) => {
    if(activeView === 'Search') {
        return setReservations(res.props.activeReservation);
    }
    if(!activeRange)
        return;
    if(Array.isArray(activeRange))
        return setReservations(res.props.availability_for_date_range);
    return setReservations(res.props.current_day_reservations);
}

export const getDate = (num, activeRange) => {
    switch (num) {
        case 0 : {
            if(!activeRange)
                return '';
            if(Array.isArray(activeRange))
                return getFormattedDate(activeRange[0]);
            return typeof activeRange === 'object' ? getFormattedDate(activeRange) : activeRange;
        }
        case 1 : {
            if(!activeRange)
                return '';
            if(Array.isArray(activeRange))
                return getFormattedDate(activeRange[1]);
            return '';
        }
    }
}

export const handleChangeReservationStatus = (status, activeReservation, setActiveReservation, activeRange, setReservations, activeView) => {
    Inertia.patch(route('Change_Reservation_Status'),{date_start:getDate(0, activeRange), date_end:getDate(1, activeRange)
        ,reservation_id:activeReservation.id,status:status},{
        onSuccess:(res)=> {
            setActiveReservation(res.props.activeReservation);
            handleSetReservations(res,activeRange, setReservations, activeView);
        },
        only:[getParameter(activeRange), 'activeReservation']
    });
}

export const handleCreateNewReservationForDate = (date, type, people) => {
    if(!date || !type || people === 0)
        return;
    Inertia.get(route('Show.Gazebo.Reservation.Form'),{selectedDate:date, selectedType:type, selectedPeople:people});
}
