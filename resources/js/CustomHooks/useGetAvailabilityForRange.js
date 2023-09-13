import {useState,useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetAvailabilityForRange(activeRange, reservationType, dependencies=[]) {
    const [requestProgress,setRequestProgress] = useState(''),
    [availability,setAvailability] = useState([]);

    useEffect(()=>{
        Inertia.get(route('Get_Availability_For_Range'),{date_start:getFormattedDate(activeRange[0],'-',1),
                date_end:getFormattedDate(activeRange[1],'-',1),type:reservationType},
            {onStart:()=>setRequestProgress('Pending'),
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setAvailability(res.props.availability_for_date_range);
                }, preserveScroll:true, preserveState:true, only:['availability_for_date_range']});
    },[...dependencies]);

    return [requestProgress, availability, setAvailability];
}
