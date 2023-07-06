import {Card, Col, Form, FormGroup, FormLabel, Row, Stack} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {SettingsContext} from "../../Contexts/SettingsContext";
import {LocalSettingsContext} from "../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../Contexts/ErrorsContext";
import {DinnerTimeSettings} from "./DinnerTimeSettings/DinnerTimeSettings";
import {compareTimes} from "../../../../ExternalJs/Util";
import {useReducer} from "react";
import {useState} from "react";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";

export function DinnerSettings() {
    const innerWidth = useContext(InnerWidthContext);
    const [errors,setErrors] = useState({
        Arrival : '',
        Departure : '',
        First_Day : '',
        Last_Day : '',
        Arrival_Times_Too_Close:''
    });

    const local_settings_reducer = (localSettings,action) => {
        switch (action.type) {
            case 'Set_Arrival_Time_Strict' : {
                return {...localSettings,Strict_Arrival_Time : action.value};
            }

            case 'Set_No_Departure_Time' : {
                return {...localSettings,No_Departure_Time : action.value};
            }

            case 'Set_Departure_Next_Day' : {
                return {...localSettings,Departure_Is_Next_Day : action.value};
            }

        }
    };

    const [localSettings,dispatchLocalSetting] = useReducer(local_settings_reducer,{
        Strict_Arrival_Time : true,
        Departure_Is_Next_Day : false,
        No_Departure_Time : true
    });

    const settings_reducer = (settings,action) => {
        switch (action.type) {
            case 'Change_Arrival_Start' : {
                if(localSettings.No_Departure_Time || settings.Departure === '') {
                    return {...settings,Arrival_Start : action.value};
                }
                switch(compareTimes(action.value,settings.Departure,localSettings.Departure_Is_Next_Day)) {
                    case 1 :{
                        setErrors({...errors,Arrival:'H ώρα άφιξης δεν μπορεί να είναι μετά την ώρα αναχώρησης.'});
                        return {...settings,Arrival_Start:''}
                    }
                    case 0 : {
                        setErrors({...errors,Arrival:'H ώρα άφιξης δεν μπορεί να είναι η ίδια με την ώρα αναχώρησης.'});
                        return {...settings,Arrival_Start:''}
                    }
                    case -1 :{
                        if(errors.Arrival !== '')
                            setErrors({...errors,Arrival:''})
                        return {...settings,Arrival_Start : action.value};
                    }
                }
                break;
            }
            case 'Change_Arrival_End' : {
                switch(compareTimes(action.value,settings.Arrival_Start)) {
                    case -1 :{
                        setErrors({...errors,Arrival:'H αργότερη ώρα άφιξης δεν μπορεί να είναι πριν την νωρίτερη.'});
                        return {...settings,Arrival_End:''}
                    }
                    case 0 : {
                        setErrors({...errors,Arrival:'H αργότερη ώρα άφιξης είναι ίδια με την νωρίτερη.'});
                        return {...settings,Arrival_End:''}
                    }
                    case 1 :{
                        if(errors.Arrival !== '')
                            setErrors({...errors,Arrival:''})
                        if(localSettings.No_Departure_Time  || settings.Departure === '') {
                            return {...settings,Arrival_End : action.value};
                        }
                        switch(compareTimes(action.value,settings.Departure,localSettings.Departure_Is_Next_Day)) {
                            case 1 :{
                                setErrors({...errors,Arrival:'H αργότερη ώρα άφιξης δεν μπορεί να είναι μετά την ώρα αναχώρησης.'});
                                return {...settings}
                            }
                            case 0 : {
                                setErrors({...errors,Arrival:'H ώρα αργότερη ώρα άφιξης δεν μπορεί να είναι η ίδια με την ώρα αναχώρησης.'});
                                return {...settings}
                            }
                            case -1 :{
                                return {...settings,Arrival_End : action.value};
                            }
                        }
                    }
                }
                break;
            }
            case 'Change_Departure' : {
                if(settings.Arrival_End === ''){
                    return {...settings,Departure : action.value};
                }
                const comparison = settings.Arrival_End !== '' ? compareTimes(action.value,settings.Arrival_End,localSettings.Departure_Is_Next_Day) :
                    compareTimes(action.value,settings.Arrival_Start,localSettings.Departure_Is_Next_Day);
                switch(comparison) {
                    case -1 :{
                        setErrors({...errors,Departure:'H ώρα αναχώρησης δεν μπορεί να είναι πριν την ώρα άφιξης.'});
                        return {...settings}
                    }
                    case 0 : {
                        setErrors({...errors,Departure:'H ώρα αναχώρησης δεν μπορεί να είναι η ίδια με την ώρα άφιξης.'});
                        return {...settings}
                    }
                    case 1 :{
                        if(errors.Departure !== '')
                            setErrors({...errors,Departure:''})
                        return {...settings,Departure : action.value};
                    }
                }
                break;
            }
            case 'Change_First_Date' : {
                return {...settings,First_Day : action.value};
            }
            case 'Change_Last_Date' : {
                return {...settings,Last_Day : action.value};
            }
            case 'Change_Arrival_Message' : {
                return {...settings,Arrival_Message : action.value};
            }

        }
    };

    const [settings, dispatchSetting] = useReducer(settings_reducer, {
        Arrival_Start: '20:30',
        Arrival_End: '',
        Departure: '',
        First_Day: '',
        Last_Day: '',
        Arrival_Message : '',

    });
    useEffect(()=>{
        let Message = '';
        if(!localSettings.Strict_Arrival_Time)
            Message = 'Please note that this booking requires an arrival time between ' +  settings.Arrival_Start + ' and ' + (settings.Arrival_End ?? '') + '.';
        else
            Message = 'Please note that this booking requires an arrival time of ' + settings.Arrival_Start + '.';
        dispatchSetting({type:'Change_Arrival_Message',value:Message});
    },[])

    useEffect(()=>{
        console.log(localSettings.No_Departure_Time)
        if(localSettings.No_Departure_Time)
        {
            if (errors.Departure !== '')
                setErrors({...errors,Departure: ''})
        }

    },[localSettings.No_Departure_Time])

    return (
        <ErrorsContext.Provider value={{errors,setErrors}}>
            <LocalSettingsContext.Provider value={{localSettings, dispatchLocalSetting}}>
                <SettingsContext.Provider value={{settings,dispatchSetting}}>
                    <div  className={'pt-5'}>
                        <DinnerTimeSettings></DinnerTimeSettings>
                        <DinnerDateSettings></DinnerDateSettings>
                    </div>
                </SettingsContext.Provider>
            </LocalSettingsContext.Provider>
        </ErrorsContext.Provider>
    )
}
