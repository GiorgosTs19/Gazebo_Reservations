import {Inertia} from "@inertiajs/inertia";
import {useEffect, useState} from "react";
import useUpdateEffect from "./useUpdateEffect";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetReservationsForSpecificDate(date, reservationType, dependencies=[], conditions=true) {
    const [requestProgress,setRequestProgress] = useState(''),
    [reservations,setReservations] = useState([]);

    useEffect(()=>{
        if(date === '' || date === null)
            return;
        if(!conditions)
            return;
        const dateToSearch = typeof date === "object" ? getFormattedDate(date) : date;
        Inertia.get(route('Get_Reservations_For_Date'),{date:dateToSearch,type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                only:['availability_for_date'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setReservations(res.props.availability_for_date);
                }, preserveScroll:true, preserveState:true});
    },dependencies);

    return [requestProgress, reservations ?? [], setReservations];
}
