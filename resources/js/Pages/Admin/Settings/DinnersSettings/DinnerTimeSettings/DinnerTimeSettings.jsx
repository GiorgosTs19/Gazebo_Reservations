import {Card, Col, Form, FormCheck, FormGroup, FormLabel, Image, Row, Stack} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {getTimeDifferenceInMinutes} from "../../../../../ExternalJs/Util";
import {TimePicker} from "../../Components/TimePicker";

export function DinnerTimeSettings() {
    const [show,setShow] = useState(false),
        {settings,dispatchSetting} = useContext(SettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        innerWidth = useContext(InnerWidthContext),
        [useCustomMessage,setUseCustomMessage] = useState(false);

    const handleArrivalTimeStartChange = (value) => {
        dispatchSetting({type:'Change_Arrival_Start',value : value})
    };
    const handleArrivalTimeEndChange = (value) => {
        dispatchSetting({type:'Change_Arrival_End',value : value})
    };
    const handleStrictArrivalTimeChange = (e) => {
        const isChecked = !e.target.checked;
        dispatchLocalSetting({type:'Set_Arrival_Time_Strict',value:isChecked});
    };
    const handleChangeArrivalMessage = (e) => {
        const Message = e.target.value;
        dispatchSetting({type:'Change_Arrival_Message',value:Message});
    };
    const handleChangeUseCustomMessage = (e) => {
        const isChecked = !e.target.checked;
        setUseCustomMessage(isChecked);
    };
    const handleShowChange = () => {
        setShow(!show);
    }
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
        <div className={"settings-header-border "  + (!show ? 'text-center' : '')}>
            <h4 className="settings-heading-subtitle" onClick={handleShowChange}><span>Ωράρια</span></h4>
            {!show && <h6 onClick={handleShowChange} style={{cursor:'pointer'}}>Κάντε κλίκ για επέκταση</h6>}
            <Row className={'p-2'} hidden={!show}>
                <Col xs={12} xl={6} className={(innerWidth > 992 ? 'border-end' : 'border-bottom')}>
                    <Card className={'border-0 ' + (innerWidth > 992 ? '' : 'text-center')}>
                        <Card.Header className={'bg-transparent ' + (innerWidth > 992 ? 'border-bottom' : 'border-0')}>Άφιξη</Card.Header>
                        <Row>
                            <Col xs={12}>
                                <div className={'p-1 d-flex flex-column text-center'}>
                                    <Card.Subtitle className={'mt-2 mx-auto'}>
                                        <Stack direction={'horizontal'} className={'mx-auto'}>
                                            <h6>Συγκεκριμένη Ώρα</h6>
                                            <Form.Switch className={'mx-3'} checked={!localSettings.Strict_Arrival_Time} onChange={handleStrictArrivalTimeChange}></Form.Switch>
                                            <h6>Εύρος Ωρών</h6>
                                        </Stack>
                                    </Card.Subtitle>
                                    <Card.Body className={'p-0 mx-auto w-100'}>
                                        <FormLabel is={'string'} >{localSettings.Strict_Arrival_Time ? 'Ώρα' : 'Ωράριο'} άφιξης πελατών : </FormLabel>
                                        <Row direction={'horizontal'} className={'my-3 my-lg-1'}>
                                            <Col md={localSettings.Strict_Arrival_Time ? 12 : 5}>
                                                <Stack>
                                                    <TimePicker onChange={handleArrivalTimeStartChange} inputValue={settings.Arrival_Start} Name={'Arrival_Start'}
                                                    textPrefix={!localSettings.Strict_Arrival_Time ? 'Aπο :' : ''}></TimePicker>
                                                </Stack>
                                            </Col>
                                            {!localSettings.Strict_Arrival_Time &&
                                                <>
                                                    <Col md={2} className={'d-flex flex-column'}>
                                                        <span className={'my-auto fw-bold'}>-</span>
                                                    </Col>
                                                    <Col md={5}>
                                                        <Stack>
                                                            <TimePicker onChange={handleArrivalTimeEndChange} inputValue={settings.Arrival_End} Name={'Arrival_End'}
                                                            textPrefix={'Έως : '}></TimePicker>
                                                        </Stack>
                                                    </Col>
                                            </>}
                                            {errors.Arrival !== '' &&
                                                <p className={'text-danger fst-italic my-3'}>{errors.Arrival}</p>}
                                        </Row>
                                    </Card.Body>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} xl={6} className={'pb-3 pb-lg-0 text-center'}>
                    <Row>
                        <Col xl={5}>
                            <div className={'p-1'}>
                                <p className={'fw-bold fst-italic'}>Επισκόπηση Μηνύματος προς τους πελάτες</p>
                                <Form.Control as="textarea" rows={3} value={settings.Arrival_Message} style={{resize:'none'}}
                                              onChange={handleChangeArrivalMessage}/>
                                <p className={'text-muted text-center mb-0'}>Το παραπάνω μήνυμα εμφανίζεται στην φόρμας κράτησης.</p>
                            </div>
                        </Col>
                        <Col xl={5}>
                            <p className={'fw-bold fst-italic'}>Μπορείτε να χρησιμοποιήσετε το μήνυμα που
                                δημιουργείται αυτόματα από το σύστημα, ή μπορείτε να θέσετε κάποιο δικό σας.</p>
                            <p>Η χρησιμότητα αυτού του μηνύματος είναι η μετάβαση πληροφοριών στους πελάτες όπως,
                                η ώρα άφιξης για την κράτηση που θα κάνουν, είτε για οτιδήποτε άλλο χρειάζεται να είναι ενήμεροι.</p>
                        </Col>
                        <Col xl={2} className={'d-flex flex-column'}>
                            <div className={'my-auto'}>
                                <FormLabel>Αυτόματο</FormLabel>
                                <Form.Switch className={'mx-3'} checked={!useCustomMessage} onChange={handleChangeUseCustomMessage}></Form.Switch>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {show && errors.Arrival_Times_Too_Close !== '' && <p className={'text-center text-warning'}>
                <Image src={'/Images/Icons/warning.png'} className={'me-3'}></Image>
                {errors.Arrival_Times_Too_Close}
            </p>}
        </div>
    )
}
