import {compareTimes} from "../../../../ExternalJs/Util";

export function Arrival_Start_Error_Check(localSettings,settings,{errors,setErrors}) {
        if(localSettings.Strict_Arrival_Time){
            return setErrors({...errors,Arrival:'',Arrival_Times_Too_Close:''})
        }
        if(settings.Arrival_End !== ''){
            switch(compareTimes(settings.Arrival_Start,settings.Arrival_End)) {
                case 1 :{
                    if(errors.Arrival === 'H νωρίτερη ώρα άφιξης δεν μπορεί να είναι μετά την αργότερη.')
                        return ;
                    return setErrors({...errors,Arrival:'H νωρίτερη ώρα άφιξης δεν μπορεί να είναι μετά την αργότερη.'});
                }
                case 0 : {
                    if(errors.Arrival === 'H νωρίτερη ώρα άφιξης δεν μπορεί να είναι η ίδια την αργότερη.')
                        return ;
                    return setErrors({...errors,Arrival:'H νωρίτερη ώρα άφιξης δεν μπορεί να είναι η ίδια την αργότερη.'});
                }
                case -1 :{
                    if(errors.Arrival !== '')
                        return setErrors({...errors,Arrival:''});
                    return;
                }
            }
        }
}

export function Change_Arrival_End_Error_Check(localSettings,settings,action,{errors,setErrors}) {
    switch(compareTimes(action.value,settings.Arrival_Start)) {
        case -1 :{
            setErrors({...errors,Arrival_End:'H αργότερη ώρα άφιξης δεν μπορεί να είναι πριν την νωρίτερη.'});
            return {...settings,Arrival_End:action.value}
        }
        case 0 : {
            setErrors({...errors,Arrival_End:'H αργότερη ώρα άφιξης είναι ίδια με την νωρίτερη.'});
            return {...settings,Arrival_End:action.value}
        }
        case 1 :{
            if(errors.Arrival !== '')
                setErrors({...errors,Arrival_End:''})
            if(localSettings.No_Departure_Time  || settings.Departure === '') {
                return {...settings,Arrival_End : action.value};
            }
            switch(compareTimes(action.value,settings.Departure,localSettings.Departure_Is_Next_Day)) {
                case 1 :{
                    setErrors({...errors,Arrival_End:'H αργότερη ώρα άφιξης δεν μπορεί να είναι μετά την ώρα αναχώρησης.'});
                    return {...settings}
                }
                case 0 : {
                    setErrors({...errors,Arrival_End:'H ώρα αργότερη ώρα άφιξης δεν μπορεί να είναι η ίδια με την ώρα αναχώρησης.'});
                    return {...settings}
                }
                case -1 :{
                    return {...settings,Arrival_End : action.value};
                }
            }
        }
    }
}
