import {Card, Form} from "react-bootstrap";
import {useEffect,useState,useContext} from "react";
import {DatabaseSettingsContext} from "../../../Contexts/DatabaseSettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {LocalisedSettingsContext} from "../../../Contexts/LocalisedSettingsContext";

export function ArrivalMessageSettings() {
    const {settings,dispatchSetting} = useContext(LocalisedSettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        [useCustomMessage,setUseCustomMessage] = useState(false);

    const handleChangeArrivalMessage = (e) => {
        const Message = e.target.value;
        dispatchSetting({type:'Change_Arrival_Message',value:Message});
    };
    const handleChangeUseCustomMessage = (e) => {
        const isChecked = !e.target.checked;
        setUseCustomMessage(isChecked);
    };

    useEffect(()=>{
        if(useCustomMessage)
            return;
        let Message = '';
        if(!localSettings.Strict_Arrival_Time)
            Message = 'Please note that this reservation requires an arrival time between ' +  settings.Arrival_Start + ' and ' + (settings.Arrival_End ?? '') + '.';
        else
            Message = 'Please note that this reservation requires an arrival time of ' + settings.Arrival_Start + '.';
        return dispatchSetting({type:'Change_Arrival_Message',value:Message});
    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);


    return (
        <Card className={'border-top box_shadow d-flex m-auto w-100 h-100 mt-4 mt-xxl-0'} style={{width:"fit-content"}}>
            <Card.Header className={'d-flex bg-transparent m-auto'}>
                <p className={'fw-bold fst-italic text-center'}>Μήνυμα προς τους πελάτες</p>
            </Card.Header>
            <Card.Body className={'p-3 m-auto w-100 d-flex flex-column text-center'}>
                <Form.Control as="textarea" rows={3} value={settings.Arrival_Message} style={{resize:'none'}}
                              onChange={handleChangeArrivalMessage} className={'m-auto'}/>
                <p className={'text-muted text-center mb-0 user-select-none'}>Το παραπάνω μήνυμα εμφανίζεται στην φόρμας κράτησης.</p>
            </Card.Body>
        </Card>
    )
}
