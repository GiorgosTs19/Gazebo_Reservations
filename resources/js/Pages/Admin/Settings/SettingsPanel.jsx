import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {useContext, useState} from "react";
import {DinnerSettings} from "./DinnersSettings/DinnerSettings";
import {ReservationsContext} from "../../../Contexts/ReservationsContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";

export function SettingsPanel({Bed_Reservations,Dinner_Reservations}) {
    const [activeTabKey, setActiveTabKey] = useState('SeaSide'),
    innerWidth = useContext(InnerWidthContext);
    const handleTabSelect = (k) => {
        // if(activeTabKey === 'Edit')
        setActiveTabKey(k)
    }
    const Today = new Date();
    console.log(Today)
    const [errors,setErrors] = useState({
        Seaside_Arrival : '',
        SeaSide_Departure : '',
        SeaSide_First_Day : '',
        SeaSide_Last_Day : '',
        SeaBed_Arrival : '',
        SeaBed_Departure : '',
        SeaBed_First_Day : '',
        SeaBed_Last_Day : '',
    });

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
            <Tabs defaultActiveKey="SeaSide" className="mb-3" activeKey={activeTabKey}
                  onSelect={(k) => handleTabSelect(k)}>
                <Tab eventKey="SeaSide" title="Βραδινά">
                    <Col style={{height:innerWidth > 1200 ? '85vh' : '75vh',overflowY:'auto'}}>
                        <ReservationsContext.Provider value={Dinner_Reservations}>
                            <DinnerSettings></DinnerSettings>
                        </ReservationsContext.Provider>
                    </Col>
                </Tab>
                <Tab eventKey="SeaBeds" title="Πρωινά">

                </Tab>
            </Tabs>
        </Row>
    )
}
