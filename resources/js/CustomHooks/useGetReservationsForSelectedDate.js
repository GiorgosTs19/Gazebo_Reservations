import {Inertia} from "@inertiajs/inertia";
import {getFormattedDate} from "../ExternalJs/Util";
import {useEffect} from "react";


export function useGetReservationsForSelectedDate (selectedDate) {
    let reservationsToReturn = [];
    if(selectedDate === '' || selectedDate === ['',''])
        return [];

    useEffect(()=> {
        if(!Array.isArray(selectedDate)){
            return Inertia.get(route('Get_Availability_For_Date'), {date: getFormattedDate(selectedDate,'-',1),get_reservations:true},{
                only:['availability_for_date'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    // console.log('Response From Single Date',res.props)
                    reservationsToReturn = res.props.availability_for_date ;
                }
            });
        } else {
            if(selectedDate !== ['','']) {
                return Inertia.get(route('Get_Availability_For_Dates'), {date_start: getFormattedDate(selectedDate[0],'-',1),
                    date_end:getFormattedDate(selectedDate[1],'-',1)},{
                    only:['availability_for_date_range'],
                    preserveScroll:true,
                    preserveState:true,
                    onSuccess:(res)=>{
                        // console.log('Response From Range',res.props)
                        reservationsToReturn = res.props.availability_for_date_range;
                    }
                });
            }
        }
    },[selectedDate])

    return reservationsToReturn;
}
