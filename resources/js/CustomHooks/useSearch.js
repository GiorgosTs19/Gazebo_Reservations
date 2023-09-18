import {useState,useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";

export function useSearch(searchCriteria, noCriteriaActive, dependencies=[], conditions = true) {
    const [requestProgress,setRequestProgress] = useState(),
    [searchResult,setSearchResult] = useState(null);
    useEffect(()=>{
        if(noCriteriaActive && searchResult === null)
            return;
        if(noCriteriaActive) {
            return setSearchResult(null);
        }
        if(!conditions)
            return ;

        if(searchCriteria.email !== '' || searchCriteria.conf_number !== '' || searchCriteria.phone_number !== '')
            Inertia.get(route('Search_Reservations'),searchCriteria,{
                onStart:()=>setRequestProgress('Pending'),
                onFinish:()=>setRequestProgress('Finished'),
                only:['search_result'], preserveScroll:true, preserveState:true,
                onSuccess:(res)=>setSearchResult(res.props.search_result)});
    },[...dependencies]);

    return [requestProgress, searchResult ?? null, setSearchResult];
}
