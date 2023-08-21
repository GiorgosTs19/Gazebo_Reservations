import {Col, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {getTimeDifferenceInMinutes} from "../../../../../ExternalJs/Util";
import {ArrivalSettings} from "./ArrivalSettings";
import {ArrivalMessageSettings} from "./ArrivalMessageSettings";
import {LocalisedSettingsContext} from "../../../Contexts/LocalisedSettingsContext";

export function DinnerTimeSettings({children}) {
    const [show,setShow] = useState(false),
        {settings,dispatchSetting} = useContext(LocalisedSettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        innerWidth = useContext(InnerWidthContext),
        [useCustomMessage,setUseCustomMessage] = useState(false);


    useEffect(()=>{
        if(localSettings.Strict_Arrival_Time){
            if(errors.Arrival_Times_Too_Close !== '')
                setErrors({...errors,Arrival_Times_Too_Close:''});
            return;
        }

        const time_between_arrivals = getTimeDifferenceInMinutes(settings.Arrival_Start,settings.Arrival_End);
        if(time_between_arrivals <= 10 && time_between_arrivals > 0)
            setErrors({...errors,Arrival_Times_Too_Close:('Οι ώρες άφιξης που έχετε θέσει, έχουν διαφορά μόνο ' + time_between_arrivals + ' λεπτά.'
                    + ' Σε αυτήν την περίπτωση προτείνεται να θέσετε μία συγκεκριμένη ώρα άφιξης. Σε περίπτωση που αυτό γίνεται εσκεμμένα, αγνοήστε αυτό το μήνυμα.' )})
        else {
            if(errors.Arrival_Times_Too_Close !== '')
                setErrors({...errors,Arrival_Times_Too_Close:''});
        }
    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);
    return (
        // settings-header-border
        <div className={'user-select-none text-center'}>
            {children}
            <Row>
                <Col xl={6}>
                    <ArrivalSettings></ArrivalSettings>
                </Col>
                <Col className={'mt-4 mt-xl-0'}>
                    <ArrivalMessageSettings></ArrivalMessageSettings>
                </Col>
            </Row>
        </div>
    )
}
