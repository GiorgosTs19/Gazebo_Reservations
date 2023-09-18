import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";

export function useGetActiveReservation(reservation_id, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState('Pending'),
    [activeReservation,setActiveReservation] = useState(null);

    useEffect(()=>{
        Inertia.get(route('Get_Reservation'),{reservation_id:reservation_id},
            {onStart:()=>setRequestProgress('Pending'),
                only:['activeReservation'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setActiveReservation(res.props.activeReservation);
                }, preserveScroll:true, preserveState:true});
    },[...dependencies]);

    return [requestProgress, activeReservation ?? null, setActiveReservation];
}
