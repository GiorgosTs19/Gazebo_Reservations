import {useState,useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetAvailabilityForDate(date, reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState(''),
    [availability,setAvailability] = useState([]);
    const dateToSearch = typeof date === "object" ? getFormattedDate(date) : date;
    useEffect(()=>{
        Inertia.get(route('Get_Availability_For_Date'),{date:dateToSearch,type:reservationType,
                exceptCancelled:true},
            {onStart:()=>setRequestProgress('Pending'),
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setAvailability(res.props.availability_for_date);
                }, preserveScroll:true, preserveState:true, only:['availability_for_date']});
    },[...dependencies]);

    return [requestProgress, availability, setAvailability];
}
