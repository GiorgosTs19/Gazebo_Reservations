import {Col, Image, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {getTimeDifferenceInMinutes} from "../../../../../ExternalJs/Util";
import {ArrivalSettings} from "./ArrivalSettings";
import {ArrivalMessageSettings} from "./ArrivalMessageSettings";
import {ReservationDateRangeSettings} from "../DinnerDateSettings/ReservationDateRangeSettings";

export function DinnerTimeSettings() {
    const [show,setShow] = useState(false),
        {settings,dispatchSetting} = useContext(SettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        innerWidth = useContext(InnerWidthContext),
        [useCustomMessage,setUseCustomMessage] = useState(false);


    const handleShowChange = () => {
        setShow(!show);
    }


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
        <div>
            <Row>
                <Col xl={6}>
                    <ArrivalSettings></ArrivalSettings>
                </Col>
                <Col className={'mt-4 mt-xl-0'}>
                    <ArrivalMessageSettings></ArrivalMessageSettings>
                </Col>
            </Row>
            <ReservationDateRangeSettings></ReservationDateRangeSettings>
        </div>
    )
}

{/*    <Col xs={12} xl={6} className={'d-flex ' + (innerWidth > 992 ? 'border-end' : 'border-bottom')}>*/}

{/*</Col>*/}
{/*<Col xs={12} xl={6} className={'pb-3 pb-lg-0 text-center'}>*/}
{/*<Row>*/}
{/*<Col xl={5}>*/}
{/*    <div className={'p-1'}>*/}
{/*        <p className={'fw-bold fst-italic'}>Επισκόπηση Μηνύματος προς τους πελάτες</p>*/}
{/*        <Form.Control as="textarea" rows={3} value={settings.Arrival_Message} style={{resize:'none'}}*/}
{/*                      onChange={handleChangeArrivalMessage}/>*/}
{/*        <p className={'text-muted text-center mb-0'}>Το παραπάνω μήνυμα εμφανίζεται στην φόρμας κράτησης.</p>*/}
{/*    </div>*/}
{/*</Col>*/}
{/*<Col xl={5}>*/}
{/*    <p className={'fw-bold fst-italic'}>Μπορείτε να χρησιμοποιήσετε το μήνυμα που*/}
{/*        δημιουργείται αυτόματα από το σύστημα, ή μπορείτε να θέσετε κάποιο δικό σας.</p>*/}
{/*    <p>Η χρησιμότητα αυτού του μηνύματος είναι η μετάβαση πληροφοριών στους πελάτες όπως,*/}
{/*        η ώρα άφιξης για την κράτηση που θα κάνουν, είτε για οτιδήποτε άλλο χρειάζεται να είναι ενήμεροι.</p>*/}
{/*</Col>*/}
{/*<Col xl={2} className={'d-flex flex-column'}>*/}
{/*    <div className={'my-auto'}>*/}
{/*        <FormLabel>Αυτόματο</FormLabel>*/}
{/*        <Form.Switch className={'mx-3'} checked={!useCustomMessage} onChange={handleChangeUseCustomMessage}></Form.Switch>*/}
{/*    </div>*/}
{/*</Col>*/}
{/*</Row>*/}

{/*</Col>*/}
