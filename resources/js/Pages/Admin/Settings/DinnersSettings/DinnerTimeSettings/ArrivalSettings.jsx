import {Card, Col, Form, FormLabel, Image, Row, Stack} from "react-bootstrap";
import {TimePicker} from "../../Components/TimePicker";
import {useContext} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";

export function ArrivalSettings() {
    const {settings,dispatchSetting} = useContext(SettingsContext),
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
    return (
        <Card className={'border-top box_shadow mx-auto my-4 my-xxl-0 w-100 h-100'} >
            <Card.Header className={'d-flex bg-transparent '}>
                <Stack direction={'horizontal'} className={'mx-auto'}>
                    <h6>Συγκεκριμένη Ώρα</h6>
                    <Form.Switch className={'mx-3'} checked={!localSettings.Strict_Arrival_Time} onChange={handleStrictArrivalTimeChange}></Form.Switch>
                    <h6>Εύρος Ωρών</h6>
                </Stack>
            </Card.Header>
            <Card.Body className={'px-2 py-3 mx-auto w-100 d-flex flex-column text-center'}>
            <FormLabel is={'string'}  className={'mx-auto'}>{localSettings.Strict_Arrival_Time ? 'Ώρα' : 'Ωράριο'} άφιξης πελατών</FormLabel>
            <Row direction={'horizontal'} className={'my-3 my-lg-3 mx-auto w-100'}>
                <Col md={localSettings.Strict_Arrival_Time ? 12 : 6} className={'' + (!localSettings.Strict_Arrival_Time ? 'border-end' : '')}>
                    <Stack>
                        <TimePicker onChange={handleArrivalTimeStartChange} inputValue={settings.Arrival_Start} Name={'Arrival_Start'}
                                    textPrefix={!localSettings.Strict_Arrival_Time ? 'Aπο ' : ''}></TimePicker>
                    </Stack>
                </Col>
                {!localSettings.Strict_Arrival_Time &&
                    <Col md={6} >
                        <Stack>
                            <TimePicker onChange={handleArrivalTimeEndChange} inputValue={settings.Arrival_End} Name={'Arrival_End'}
                                        textPrefix={'Έως '}></TimePicker>
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
