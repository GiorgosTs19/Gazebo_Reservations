import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetCancelledReservations(reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState(''),
    [reservations,setReservations] = useState([]);

    useEffect(()=>{
        Inertia.get(route('Get_Cancelled_Reservations'),{type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                only:['cancelled_reservations'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    console.log('res', res.props);
                    setReservations(res.props.cancelled_reservations);
                }, preserveScroll:true, preserveState:true});
    },dependencies);

    return [requestProgress, reservations ?? [], setReservations];
}
