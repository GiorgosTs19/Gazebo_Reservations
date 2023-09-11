import {useContext} from "react";
import {DinnerSettings} from "./DinnersSettings/DinnerSettings";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

export function SettingsPanel({dinnerSettings}) {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    const renderContent = () => {
        switch (reservationType) {
            case 'Dinner' : {
                return <DinnerSettings Settings={dinnerSettings}></DinnerSettings>;
            }
            case 'Bed' : {
                return null;
            }
        }
    }


    // const local_settings_reducer = (state,action) => {
    //     switch (action.type) {
    //         case 'Set_SB_Arrival_Time_Strict' : {
    //             return {...state,Strict_SeaBed_Arrival_Time : action.value};
    //         }
    //         case 'Set_SB_Departure_Time_Strict' : {
    //             return {...state,Strict_SeaBed_Arrival_Time : action.value};
    //         }
    //         case 'Set_SB_Departure_Next_Day' : {
    //             return {...state,SeaBed_Departure_Is_Next_Day : action.value};
    //         }
    //     }
    // };

    // const [localSettings,dispatchLocalSetting] = useReducer(local_settings_reducer,{
    //     Strict_Arrival_Time : false,
    //     Strict_Departure_Time : false,
    //     Departure_Is_Next_Day : false,
    // });




        // SeaBed_Arrival : '',
        // SeaBed_Departure : '',
        // SeaBed_First_Day : '',
        // SeaBed_Last_Day : '',


    return (
    <>
        {renderContent()}
    </>
    )
}
