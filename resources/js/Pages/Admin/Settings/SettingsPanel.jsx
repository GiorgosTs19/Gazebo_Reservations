import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {useContext, useState} from "react";
import {DinnerSettings} from "./DinnersSettings/DinnerSettings";
import {ReservationsContext} from "../../../Contexts/ReservationsContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

export function SettingsPanel({Bed_Reservations,Dinner_Reservations,dinnerSettings,BedSettings}) {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        [activeTabKey, setActiveTabKey] = useState('Dinner'),
        Reservations = useContext(ReservationsContext),
    innerWidth = useContext(InnerWidthContext);
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
    <Row>
        {renderContent()}
    </Row>
    )
}
