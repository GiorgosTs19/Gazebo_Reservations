import {Card, Col, FormGroup, Row, Stack} from "react-bootstrap";
import {changeDateFormat} from "../../../../../ExternalJs/Util";
import {useContext} from "react";
import {DatabaseSettingsContext} from "../../../Contexts/DatabaseSettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {LocalisedSettingsContext} from "../../../Contexts/LocalisedSettingsContext";

export function ReservationDateRangeSettings() {
    const {settings,dispatchSetting} = useContext(LocalisedSettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        innerWidth = useContext(InnerWidthContext);

    const handleFirstDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_First_Date',value : newTime})
    };
    const handleLastDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_Last_Date',value : newTime})
    };
    return (
        <Card className={'border-top- box_shadow mt-1 mt-lg-3 w-100 h-1000'} style={{width:'fit-content'}}>
            <Card.Header className={'bg-transparent'}>
                <p className={'text-muted'}>Εύρος ημερομηνιών που είναι διαθέσιμες για κρατήσεις</p>
                <p className={'text-muted'}>Οι πελάτες θα μπορούν να κάνουν κρατήσεις μέσα σε αυτό το εύρος ημερομηνιών.</p>
            </Card.Header>
            <Card.Body className={'px-2 py-3 mx-auto w-100 d-flex flex-column text-center'}>
                <Row className={'my-1 my-lg-auto'}>
                    <Col className={'d-flex'}>
                        <FormGroup className={'p-2 m-auto text-center'}>
                                <span className={'text-muted fst-italic ms-2'}>{settings.First_Day ? changeDateFormat(settings.First_Day,'-','-'):''}</span>
                                <Stack direction={'vertical'}>
                                    <p>Πρώτη Μέρα Κρατήσεων : </p>
                                    <input type={'date'} className={'ms-2 mb-3 p-2 rounded'} onChange={handleFirstDateChange} value={settings.First_Day}/>
                                </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                    </Col>
                    <Col className={'d-flex p-3'}>
                        <FormGroup className={'p-2 text-center m-auto'}>
                                <span className={'text-muted fst-italic ms-2'}>{settings.Last_Day ? changeDateFormat(settings.Last_Day,'-','-'):''}</span>
                                <Stack direction={'vertical'}>
                                    <p>Τελευταία Μέρα Κρατήσεων : </p>
                                    <input type={'date'} className={'ms-2 mb-3 p-2 rounded'} onChange={handleLastDateChange} min={settings.First_Day}
                                           value={settings.Last_Day}/>
                                </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
