import {useState,useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";

export function useGetAvailabilityForRange(activeRange, reservationType, dependencies=[], withDisabledTables = true) {
    const [requestProgress,setRequestProgress] = useState(''),
    [availability,setAvailability] = useState([]);

    useEffect(()=> {
        Inertia.get(route('Get_Availability_For_Range'),{date_start:typeof activeRange[0] === 'string' ? activeRange[0] : getFormattedDate(activeRange[0]),
                date_end:typeof activeRange[1] === 'string' ? activeRange[1] : getFormattedDate(activeRange[1]),type:reservationType, withDisabledTables:withDisabledTables},
            {onStart:()=>setRequestProgress('Pending'),
                onFinish:()=>setRequestProgress('Finished'),
                onSuccess:res=> {
                    // console.log('res', res.props);
                    setAvailability(res.props.availability_for_date_range);
                }, preserveScroll:true, preserveState:true, only:['availability_for_date_range']});
    },[...dependencies]);

    return [requestProgress, availability, setAvailability];
}
