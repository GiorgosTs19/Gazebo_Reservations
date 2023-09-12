import {useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";
import {useState} from "react";

export function useGetReservationsForDate(date, reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState('Pending'),
    [reservations,setReservations] = useState([]);
    // console.log(...dependencies)
    // useEffect(()=>{
    //     // console.log('called');
    //     Inertia.get(route('Get_Reservations_For_Date'),{date:getFormattedDate(date), type:reservationType},
    //         {onStart:()=>setRequestProgress('Pending'),
    //             only:['availability_for_date'],
    //             onFinish:()=>setRequestProgress('Finished'),
    //             onSuccess:res=> {
    //                 console.log('res', res.props);
    //                 setReservations(res.props.availability_for_date);
    //             }, preserveScroll:true, preserveState:true});
    // },dependencies);

    return [requestProgress, reservations ?? [], setReservations];
}
