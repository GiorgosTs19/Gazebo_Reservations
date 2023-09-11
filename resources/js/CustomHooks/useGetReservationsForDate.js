import {useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";
import {useState} from "react";

export function useGetReservationsForDate(date, reservationType) {
    const [requestProgress,setRequestProgress] = useState('Pending'),
    [reservations,setReservations] = useState([]);
    // console.log(dependencies)
    useEffect(()=>{
        Inertia.get(route('Get_Reservations_For_Date'),{date:getFormattedDate(date,'-',1), type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                only:['availability_for_date'],
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setReservations(res.props.availability_for_date);
                }, preserveScroll:true, preserveState:true});
    },[reservationType]);

    return [requestProgress, reservations, setReservations];
}
