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
    innerWidth = useContext(InnerWidthContext);

    const handleArrivalTimeStartChange = (value) => {
        dispatchSetting({type:'Change_Arrival_Start',value : value})
    };
    const handleArrivalTimeEndChange = (value) => {
        dispatchSetting({type:'Change_Arrival_End',value : value})
    };
    const handleDepartureTimeChange = (value) => {
        dispatchSetting({type:'Change_Departure',value : value})
    };
    const handleNoDepartureTimeChange = (e) => {
        const isChecked = e.target.checked;
        dispatchLocalSetting({type:'Set_No_Departure_Time',value:isChecked});
    };
    const handleStrictArrivalTimeChange = (e) => {
        const isChecked = !e.target.checked;
        dispatchLocalSetting({type:'Set_Arrival_Time_Strict',value:isChecked});
    };
    const handleChangeArrivalMessage = (e) => {
        const Message = e.target.value;
        dispatchSetting({type:'Change_Arrival_Message',value:Message});
    };
    const handleShowChange = () => {
        setShow(!show);
    }
    useEffect(()=>{
        let Message = '';
        if(!localSettings.Strict_Arrival_Time)
            Message = 'Please note that this booking requires an arrival time between ' +  settings.Arrival_Start + ' and ' + (settings.Arrival_End ?? '') + '.';
        else
            Message = 'Please note that this booking requires an arrival time of ' + settings.Arrival_Start + '.';
        dispatchSetting({type:'Change_Arrival_Message',value:Message});
    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);

    useEffect(()=>{
        if(localSettings.Strict_Arrival_Time){
            if(errors.Arrival_Times_Too_Close !== '')
                setErrors({...errors,Arrival_Times_Too_Close:''});
            return;
        }

        const time_between_arrivals = getTimeDifferenceInMinutes(settings.Arrival_Start,settings.Arrival_End);
        if(time_between_arrivals <= 10)
            setErrors({...errors,Arrival_Times_Too_Close:('Οι ώρες άφιξης που έχετε θέσει, έχουν διαφορά μόνο ' + time_between_arrivals + ' λεπτά.'
                    + ' Σε αυτήν την περίπτωση προτείνεται να θέσετε μία συγκεκριμένη ώρα άφιξης. Σε περίπτωση που αυτό γίνεται εσκεμμένα, αγνοήστε αυτό το μήνυμα.' )})
        else {
            if(errors.Arrival_Times_Too_Close !== '')
                setErrors({...errors,Arrival_Times_Too_Close:''});
        }

    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);
    // console.log(settings.Arrival_Start + ' ' + settings.Arrival_End)
    return (
        <div className={"settings-header-border "  + (!show ? 'text-center' : '')}>
            <h4 className="settings-heading-subtitle" onClick={handleShowChange}><span>Ωράρια</span></h4>
            {!show && <h6 onClick={handleShowChange} style={{cursor:'pointer'}}>Κάντε κλίκ για επέκταση</h6>}
            <Row className={'p-2'} hidden={!show}>
                <Col xs={12} lg={4} xl={4} className={(innerWidth > 992 ? 'border-end' : 'border-bottom')}>
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
                                    <Card.Body className={'p-0 mx-auto'}>
                                        <FormLabel is={'string'} >{localSettings.Strict_Arrival_Time ? 'Ώρα' : 'Ωράριο'} άφιξης πελατών : </FormLabel>
                                        <Stack direction={'horizontal'} className={'my-3 my-lg-1'}>
                                            <Stack>
                                                {!localSettings.Strict_Arrival_Time && <FormLabel>Από : <span className={'text-muted fst-italic text-center mb-2 p-0'}>
                                                    {settings.Arrival_Start}
                                                    </span>
                                                </FormLabel>}
                                                <TimePicker onChange={handleArrivalTimeStartChange} inputValue={settings.Arrival_Start}></TimePicker>
                                            </Stack>
                                            {!localSettings.Strict_Arrival_Time &&<span className={'mt-4 fw-bold'}>-</span>}
                                            {!localSettings.Strict_Arrival_Time &&
                                                <Stack>
                                                    <FormLabel className={'ms-3 me-2'}>Έως : <span className={'text-muted fst-italic text-center mb-2 p-0'}>
                                                    {settings.Arrival_End}
                                                    </span>
                                                    </FormLabel>
                                                    <TimePicker onChange={handleArrivalTimeEndChange} inputValue={settings.Arrival_End}></TimePicker>
                                                </Stack>
                                            }

                                        </Stack>
                                        {errors.Arrival !== '' &&
                                            <p className={'text-danger fst-italic'}>{errors.Arrival}</p>}
                                    </Card.Body>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} lg={4} xl={4} className={(innerWidth > 992 ? 'border-end' : 'border-bottom')}>
                    <Card className={'border-0 ' + (innerWidth > 992 ? '' : 'text-center')}>
                        <Card.Header className={'bg-transparent ' + (innerWidth > 992 ? 'border-bottom' : 'border-0')}>Αναχώρηση</Card.Header>
                        <div className={'p-0 text-center'}>
                            <Card.Body className={'p-0'}>
                                <FormGroup className={'p-0 mt-1 ms-2 d-flex flex-column'}>
                                    <p className={'text-muted'}>Η αργότερη ώρα παραμονής του πελάτη στο δείπνο.</p>
                                    <Stack direction={'horizontal'} className={'mx-auto'}>
                                        <FormCheck className={'mx-3 mb-1'} checked={localSettings.No_Departure_Time} onChange={handleNoDepartureTimeChange}></FormCheck>
                                        <FormLabel>Χωρίς όριο παραμονής.</FormLabel>
                                    </Stack>
                                    {!localSettings.No_Departure_Time && <div className={'mb-3'}>
                                        <FormLabel is={'string'}>Ώρα Αναχώρησης Πελατών : </FormLabel>
                                        <Stack className={'text-center'}>
                                            <FormLabel className={'ms-3 me-2'}><span className={'text-muted fst-italic mb-2 p-0'}>{settings.Departure}</span>
                                            </FormLabel>
                                            <TimePicker onChange={handleDepartureTimeChange} inputValue={settings.Departure}></TimePicker>
                                        </Stack>
                                        {errors.Departure !== '' &&
                                            <p className={'text-danger fst-italic'}>{errors.Departure}</p>}
                                    </div>}
                                </FormGroup>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
                <Col xs={12} lg={4} xl={4} className={'pb-3 pb-lg-0 text-center'}>
                    <div className={'p-1'}>
                        <p className={'fw-bold fst-italic'}>Επισκόπηση Μηνύματος προς τους πελάτες</p>
                        <Form.Control as="textarea" rows={3} value={settings.Arrival_Message} style={{resize:'none'}}
                                      onChange={handleChangeArrivalMessage}/>
                        <p className={'text-muted text-center mb-0'}>Το παραπάνω μήνυμα εμφανίζεται στην φόρμας κράτησης.</p>
                    </div>
                </Col>
            </Row>
            {show && errors.Arrival_Times_Too_Close !== '' && <p className={'text-center text-warning'}>
                <Image src={'/Images/Icons/warning.png'} className={'me-3'}></Image>
                {errors.Arrival_Times_Too_Close}
            </p>}
        </div>
    )
}
