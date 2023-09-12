import {useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";

export function useGetReservationsForDate(reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState('Pending'),
    [reservations,setReservations] = useState([]);
    useEffect(()=>{
        // console.log('called');
        Inertia.get(route('Get_Reservations_Current_Day'),{type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                only:['current_day_reservations'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    console.log('res', res.props);
                    setReservations(res.props.current_day_reservations);
                }, preserveScroll:true, preserveState:true});
    },dependencies);

    return [requestProgress, reservations ?? [], setReservations];
}
