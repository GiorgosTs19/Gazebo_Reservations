import {Card, FormGroup, Stack} from "react-bootstrap";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {LocalisedSettingsContext} from "../../../Contexts/LocalisedSettingsContext";
import {changeDateFormat} from "../../../../../ExternalJs/Util";
import {useContext, useState} from "react";
import Select from "react-select";
import {TimePicker} from "../../Components/TimePicker";

export function ReservationDateRangeSettings() {
    const {settings,dispatchSetting} = useContext(LocalisedSettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        [showingRestrictions, setShowingRestrictions] = useState(0);

    const handleFirstDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_First_Date',value : newTime})
    };

    const handleLastDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_Last_Date',value : newTime})
    };
    // const handleSameDayAllowance = (target) => {
    //     const bool = target.value;
    //     dispatchSetting({type:'Change_Same_Day_Allowance',value : bool})
    // };
    //
    // const handleSameDayTime = (newTime) => {
    //     dispatchSetting({type:'Change_Same_Day_Time',value : newTime})
    // };
    // const handleNextDayAllowance = (target) => {
    //     const bool = target.value;
    //     dispatchSetting({type:'Change_Next_Day_Allowance',value : bool})
    // };
    //
    // const handleNextDayTime = (newTime) => {
    //     dispatchSetting({type:'Change_Next_Day_Time',value : newTime})
    // };

    const options = [{value: true, label: 'Επιτρέπονται'},
        {value: false, label: 'Δεν επιτρέπονται'}];

    return (
        <Card className={'border-top- box_shadow mt-1 mt-lg-3 w-100 h-95'} style={{width:'fit-content'}}>
            <Card.Header className={'bg-transparent'}>
                <p className={'text-muted'}>Εύρος ημερομηνιών κρατήσεων</p>
            </Card.Header>
            <Card.Body className={'px-2 py-3 mx-auto w-100 d-flex flex-column text-center'}>
                {/*<Row className={'my-1 my-lg-auto'}>*/}
                {/*    <Col className={'d-flex'}>*/}
                        <FormGroup className={'p-2 mx-auto my-auto text-center'}>
                                <Stack direction={'vertical'} gap={2} className={'text-center'}>
                                    <span className={'text-muted fst-italic'}>Από {settings.First_Day ? changeDateFormat(settings.First_Day):''}</span>
                                    <input type={'date'} className={'ms-2 mb-3 p-2 rounded'} onChange={handleFirstDateChange} value={settings.First_Day}/>
                                </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                    {/*</Col>*/}
                    {/*<Col className={'d-flex p-3'}>*/}
                        <FormGroup className={'p-2 text-center mx-auto my-auto'}>
                                <Stack direction={'vertical'} gap={2} className={'text-center'}>
                                    <span className={'text-muted fst-italic'}>Μέχρι {settings.Last_Day ? changeDateFormat(settings.Last_Day):''}</span>
                                    <input type={'date'} className={'ms-2 mb-3 p-2 rounded'} onChange={handleLastDateChange} min={settings.First_Day}
                                           value={settings.Last_Day}/>
                                </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<h6>Περιορισμοί</h6>*/}
                {/*<p className={'info-text-lg'}>Κρατήσεις για την ίδια μέρα</p>*/}
                {/*<Select*/}
                {/*    id="same_day_restrictions"*/}
                {/*    value={options.find(obj => obj.value === settings.Allow_Same_Day)}*/}
                {/*    options={options}*/}
                {/*    onChange={handleSameDayAllowance}*/}
                {/*    className={'m-2'}*/}
                {/*    placeholder={'Επιλέξτε'}*/}
                {/*/>*/}
                {/*{settings.Allow_Same_Day && <TimePicker inputValue={settings.Same_Day_Time} onChange={handleSameDayTime} textPrefix={'Μέχρι'}/>}*/}
                {/*<p className={'mb-1'}>την ίδια μέρα</p>*/}
            </Card.Body>
        </Card>
    )
}
