import {Button, Col, Row} from "react-bootstrap";
import {LocalisedSettingsContext} from "../../Contexts/LocalisedSettingsContext";
import {LocalSettingsContext} from "../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../Contexts/ErrorsContext";
import {DinnerTimeSettings} from "./DinnerTimeSettings/DinnerTimeSettings";
import {useReducer,useState,useContext, useEffect} from "react";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {Inertia} from "@inertiajs/inertia";
import {isEqual} from "lodash";
import {PendingUnsavedChangesContext} from "../../Contexts/PendingUnsavedChangesContext";
import {PendingUnsavedChangesWarningModal} from "../../Menu/EditMenu/PendingUnsavedChangesWarningModal";
import {ShouldShowUnsavedChangesModalContext} from "../../Contexts/ShouldShowUnsavedChangesModalContext";
import {Arrival_Start_Error_Check} from "../Utility/Util";
import {DinnerTableSettings} from "./DinnerTableSettings/DinnerTableSettings";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesSettings} from "./LargeDevicesSettings";
import {MobileSettings} from "./MobileSettings";
import {ReservationDateRangeSettings} from "./DinnerDateSettings/ReservationDateRangeSettings";

export function DinnerSettings({Settings}) {
    const [errors,setErrors] = useState({
        Arrival : '',
        First_Day : '',
        Last_Day : '',
        Arrival_Times_Too_Close:''
    }),
    InnerWidth = useContext(InnerWidthContext);

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
            case 'Revert_Recent_Changes' : {
                return {...action.value};
            }
        }
    };
    const [localSettings,dispatchLocalSetting] = useReducer(local_settings_reducer,{
        Strict_Arrival_Time : Settings.Arrival_End === '',
        Departure_Is_Next_Day : false,
        No_Departure_Time : Settings.Departure === ''
    });
    const unModifiedLocalSettings = {
        Strict_Arrival_Time : Settings.Arrival_End === '',
        Departure_Is_Next_Day : false,
        No_Departure_Time : Settings.Departure === ''
    };
    const settings_reducer = (settings,action) => {
        switch (action.type) {
            case 'Change_Arrival_Start' : {
                return {...settings,Arrival_Start : action.value};
            }
            case 'Change_Arrival_End' : {
                return {...settings,Arrival_End:action.value};
            }
            case 'Change_First_Date' : {
                return {...settings,First_Day : action.value};
            }
            case 'Change_Last_Date' : {
                return {...settings,Last_Day : action.value};
            }
            case 'Change_Arrival_Message' : {
                return {...settings,Arrival_Message:action.value};
            }
            case 'Revert_Recent_Changes' : {
                return {...action.value};
            }
        }
    };
    const getPreviewText = () => {

    }
    const [settings, dispatchSetting] = useReducer(settings_reducer, {
        Arrival_Start: Settings.Arrival_Start,
        Arrival_End: Settings.Arrival_End,
        First_Day: Settings.First_Day,
        Last_Day: Settings.Last_Day,
        Arrival_Message : Settings.Arrival_Message ?? getPreviewText(),
    });

    useEffect(()=>{
        return Arrival_Start_Error_Check(localSettings,settings,{errors,setErrors});
    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);

    const settingsHaveErrors = errors.Arrival !== '' || errors.First_Day !== '' || errors.Last_Day !== '';

    const handleSaveChanges = () => {
        if(!settingsHaveErrors)
            Inertia.post(route('Save_Dinner_Settings'),settings,{preserveScroll:true,preserveState:true,
                only:['Dinner_Settings']});
    };

    // Make a deep copy of the settings from the database, in case that the setting changes need to be reverted.
    const unModifiedSettings = structuredClone(Settings);
    const {pendingUnsavedChanges,setPendingUnsavedChanges} = useContext(PendingUnsavedChangesContext);
    const settingsHaveChanged = !isEqual(settings,Settings);
    const {showUnsavedChangesWarningModal,setShowUnsavedChangesWarningModal,handleSetActiveKey} = useContext(ShouldShowUnsavedChangesModalContext);
    // If Settings have changed, change the pendingUnsavedChanges, to alert for unsaved settings in case of Tab Switch
    useEffect(()=>{
        setPendingUnsavedChanges({...pendingUnsavedChanges,Dinner:settingsHaveChanged});
    },[settingsHaveChanged]);
    // Handles the closing of the UnsavedChangesWarningModal, reverting the recent changes
    // made to the settings and switching to the wanted Tab.
    const handleCloseUnsavedChangesWarning = () => {
        dispatchLocalSetting({type:'Revert_Recent_Changes',value: unModifiedLocalSettings});
        dispatchSetting({type:'Revert_Recent_Changes',value: unModifiedSettings});
        setShowUnsavedChangesWarningModal((prev)=> {return {...prev, Show: false}});
        handleSetActiveKey(showUnsavedChangesWarningModal.Key,true);
    };
    const handleModalSaveChanges = () => {
        handleSaveChanges();
        dispatchLocalSetting({type:'Revert_Recent_Changes',value: unModifiedLocalSettings});
        setShowUnsavedChangesWarningModal((prev)=> {return {...prev, Show: false}});
        handleSetActiveKey(showUnsavedChangesWarningModal.Key,true);
    }

    return (
        <ErrorsContext.Provider value={{errors,setErrors}}>
            <LocalSettingsContext.Provider value={{localSettings, dispatchLocalSetting}}>
                <LocalisedSettingsContext.Provider value={{settings,dispatchSetting}}>
                    <PendingUnsavedChangesWarningModal handleCloseModal={handleCloseUnsavedChangesWarning}
                        shouldShowModal={showUnsavedChangesWarningModal.Show} SaveChanges={handleModalSaveChanges} >
                    </PendingUnsavedChangesWarningModal>
                    {
                        InnerWidth > 992 ? <LargeDevicesSettings>
                            <DinnerTimeSettings>
                                <Button variant={'outline-success'} disabled={!settingsHaveChanged || settingsHaveErrors}
                                        className={'rounded-5 shadow-sm mt-3 mt-xxl-0 mb-3'}
                                        onClick={handleSaveChanges}>Αποθήκευση Αλλαγών</Button>
                            </DinnerTimeSettings>
                            <ReservationDateRangeSettings></ReservationDateRangeSettings>
                        </LargeDevicesSettings> :
                            <MobileSettings>
                                <DinnerTimeSettings>
                                </DinnerTimeSettings>
                                <ReservationDateRangeSettings></ReservationDateRangeSettings>
                                <Button variant={'outline-success'} disabled={!settingsHaveChanged || settingsHaveErrors}
                                        className={'rounded-5 shadow-sm mt-3 mt-xxl-0 mb-3'}
                                        onClick={handleSaveChanges}>Αποθήκευση Αλλαγών
                                </Button>
                            </MobileSettings>
                    }
                        {/*<Row className={'px-3 py-2 mt-0 mt-lg-2 mx-auto text-center w-100'}>*/}
                        {/*    <Col className={'my-auto'}>*/}
                        {/*        <DinnerTimeSettings>*/}
                        {/*            <Button variant={'outline-success'} disabled={!settingsHaveChanged || settingsHaveErrors}*/}
                        {/*                    className={'rounded-5 shadow-sm mt-3 mt-xxl-0 mb-3'}*/}
                        {/*                    onClick={handleSaveChanges}>Αποθήκευση Αλλαγών</Button>*/}
                        {/*        </DinnerTimeSettings>*/}
                        {/*    </Col>*/}
                        {/*    <Col xxl={4} className={'d-flex mt-4 mt-lg-0'}>*/}
                        {/*        <DinnerDateSettings></DinnerDateSettings>*/}
                        {/*    </Col>*/}
                        {/*    <Col xxl={4} className={'d-flex'}>*/}
                        {/*        <DinnerTableSettings></DinnerTableSettings>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                </LocalisedSettingsContext.Provider>
            </LocalSettingsContext.Provider>
        </ErrorsContext.Provider>
    )
}
