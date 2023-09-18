import {useState,useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetReservationsForRange(activeRange, reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState('Pending'),
    [reservations,setReservations] = useState([]);

    useEffect(()=>{
        Inertia.get(route('Get_Reservations_For_Dates'),{date_start:typeof activeRange[0] === 'string' ? activeRange[0] : getFormattedDate(activeRange[0]),
                date_end:typeof activeRange[1] === 'string' ? activeRange[1] : getFormattedDate(activeRange[1]),type:reservationType, exceptCancelled:true},
            {onStart:()=>setRequestProgress('Pending'),
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setReservations(res.props.availability_for_date_range);
                }, preserveScroll:true, preserveState:true, only:['availability_for_date_range']});
    },[...dependencies]);

    return [requestProgress, reservations ?? [], setReservations];
}
