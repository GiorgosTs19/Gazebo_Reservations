import {Card, Col, Form, FormLabel, Image, Row, Stack} from "react-bootstrap";
import {TimePicker} from "../../Components/TimePicker";
import {useContext,useEffect} from "react";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {LocalisedSettingsContext} from "../../../Contexts/LocalisedSettingsContext";
import {Arrival_Start_Error_Check} from "../../Utility/Util";

export function ArrivalSettings() {
    const {settings,dispatchSetting} = useContext(LocalisedSettingsContext),
    {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
    {errors,setErrors} = useContext(ErrorsContext);

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
    useEffect(()=>{
        return Arrival_Start_Error_Check(localSettings,settings,{errors,setErrors});
    },[settings.Arrival_Start,settings.Arrival_End,localSettings.Strict_Arrival_Time]);



    return (
        <Card className={'border-top box_shadow mx-auto my-3 my-xxl-0 w-100 h-fit-content'} >
            <Card.Header className={'d-flex bg-transparent'}>
                <Stack direction={'horizontal'} className={'mx-auto'}>
                    <h6>Συγκεκριμένη Ώρα</h6>
                    <Form.Switch className={'mx-3'} checked={!localSettings.Strict_Arrival_Time} onChange={handleStrictArrivalTimeChange}></Form.Switch>
                    <h6>Εύρος Ωρών</h6>
                </Stack>
            </Card.Header>
            <Card.Body className={'px-2 py-3 mx-auto w-100 d-flex flex-column text-center'}>
            <FormLabel is={'string'}  className={'mx-auto'}>{localSettings.Strict_Arrival_Time ? 'Ώρα' : 'Ωράριο'} άφιξης πελατών</FormLabel>
            <Row direction={'horizontal'} className={'my-3 my-lg-0 mt-lg-1 mb-lg-2 mx-auto w-100'}>
                <Col md={localSettings.Strict_Arrival_Time ? 12 : 6} className={'' + (!localSettings.Strict_Arrival_Time ? 'border-end px-0' : '')}>
                    <Stack>
                        <TimePicker onChange={handleArrivalTimeStartChange} inputValue={settings.Arrival_Start} Name={'Arrival_Start'}
                                    textPrefix={!localSettings.Strict_Arrival_Time ? 'Aπο ' : ''} direction={localSettings.Strict_Arrival_Time ? 'horizontal' : 'vertical'}></TimePicker>
                    </Stack>
                </Col>
                {!localSettings.Strict_Arrival_Time &&
                    <Col md={6} className={'px-0'}>
                        <Stack>
                            <TimePicker onChange={handleArrivalTimeEndChange} inputValue={settings.Arrival_End} Name={'Arrival_End'}
                                        textPrefix={'Έως '} direction={'vertical'}></TimePicker>
                        </Stack>
                    </Col>
                }
                {errors.Arrival !== '' &&
                    <p className={'text-danger fst-italic my-3'}>{errors.Arrival}</p>}
            </Row>
                {errors.Arrival_Times_Too_Close !== '' && <p className={'text-center text-warning'}>
                    <Image src={'/Images/Icons/warning.png'} className={'me-3'}></Image>
                    {errors.Arrival_Times_Too_Close}
                </p>}
            </Card.Body>
        </Card>
    )
}
