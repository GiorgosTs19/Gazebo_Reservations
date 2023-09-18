import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";
import useUpdateEffect from "./useUpdateEffect";

export function useGetReservationsForToday(initialValue, reservationType, dependencies=[], conditions = true) {
    const [requestProgress,setRequestProgress] = useState(''),
    [reservations,setReservations] = useState(initialValue);

    useEffect(()=>{
        if(!conditions)
            return;

        Inertia.get(route('Get_Reservations_Current_Day'),{type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                only:['current_day_reservations'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setReservations(res.props.current_day_reservations);
                }, preserveScroll:true, preserveState:true});
    },[...dependencies]);

    return [requestProgress, reservations ?? [], setReservations];
}
