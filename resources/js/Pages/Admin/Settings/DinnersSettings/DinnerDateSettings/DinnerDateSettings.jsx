import {Col, FormGroup, FormLabel, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {LocalSettingsContext} from "../../../Contexts/LocalSettingsContext";
import {ErrorsContext} from "../../../Contexts/ErrorsContext";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {CalendarSettings} from "./CalendarSettings";
import {useState} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {SelectedDateSettings} from "./SelectedDateSettings/SelectedDateSettings";
import {changeDateFormat, getFormattedDate} from "../../../../../ExternalJs/Util";

export function DinnerDateSettings({DinnerReservations}) {
    const {settings,dispatchSetting} = useContext(SettingsContext),
        {localSettings,dispatchLocalSetting} = useContext(LocalSettingsContext),
        {errors,setErrors} = useContext(ErrorsContext),
        innerWidth = useContext(InnerWidthContext),
        [selectedDate,setSelectedDate] = useState(''),
        [show,setShow] = useState(false);

    const handleFirstDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_First_Date',value : newTime})
    };
    const handleLastDateChange = (e) => {
        const newTime = e.target.value;
        dispatchSetting({type:'Change_Last_Date',value : newTime})
    };
    const handleShowChange = () => {
        setShow(!show);
    }

    return (
        <div className={"settings-header-border mt-5 " + (!show ? 'text-center' : '')}>
            <h4 className="settings-heading-subtitle"
            onClick={handleShowChange}>
                <span>Ημερομηνίες</span>
            </h4>
            {!show && <h6 onClick={handleShowChange} style={{cursor:'pointer'}}>Κάντε κλίκ για επέκταση</h6>}
            <Row className={'p-2 text-center'} hidden={!show}>
                <Col xs={12} lg={4} xl={5}>
                    <p className={'text-muted'}>Εύρος ημερομηνιών που είναι διαθέσιμες για κρατήσεις</p>
                    <p className={'text-muted'}>Οι πελάτες θα μπορούν να κάνουν κρατήσεις μέσα σε αυτό το εύρος ημερομηνιών.</p>
                </Col>
                <Col xs={12} lg={8} xl={7} className={'d-flex'}>
                    <Stack direction={innerWidth > 992 ? 'horizontal' : ''} className={'m-auto'}>
                        <FormGroup className={'p-2 my-2 my-lg-0 text-center'}>
                            <Stack>
                                <span className={'text-muted fst-italic ms-2'}>{settings.First_Day ? changeDateFormat(settings.First_Day,'-','-'):''}</span>
                                <Stack direction={'horizontal'}>
                                    <p>Πρώτη Μέρα Κρατήσεων : </p>
                                    <input type={'date'} className={'ms-2 mb-3 p-1 rounded'} onChange={handleFirstDateChange} value={settings.First_Day}/>
                                </Stack>
                            </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                        <FormGroup className={'p-2 text-center'}>
                            <Stack>
                                <span className={'text-muted fst-italic ms-2'}>{settings.Last_Day ? changeDateFormat(settings.Last_Day,'-','-'):''}</span>
                                <Stack direction={'horizontal'}>
                                    <p>Τελευταία Μέρα Κρατήσεων : </p>
                                    <input type={'date'} className={'ms-2 mb-3 p-1 rounded'} onChange={handleLastDateChange} min={settings.First_Day}
                                           value={settings.Last_Day}/>
                                </Stack>
                            </Stack>
                            {errors.First_Day !== '' && <p className={'text-danger fst-italic'}>{errors.First_Day}</p>}
                        </FormGroup>
                    </Stack>
                </Col>
                <Row className={'border-top mt-2 py-3 mx-auto'}>
                    <h5 className={'text-center'}>Διαθεσιμότητα Ημερών</h5>
                    <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
                        <Col xs={12} lg={3} xl={2} className={'text-center d-flex'}>
                            <div className={'m-auto'}>
                                <p className={'text-muted fst-italic'}>Μπορείτε ανα πάσα στιγμή να αλλάξετε την διαθεσιμότητα τραπεζιών και ημερών.</p>
                                <p className={'text-danger fst-italic'}>Οι μέρες που έχετε ορίσει ως μη διαθέσιμες, θα εμφανίζονται "απενεργοποιημένες"
                                    στην φόρμα κρατήσεων.</p>
                                <p className={'text-danger fst-italic'}>Τα τραπέζια που έχετε ορίσει ως μη διαθέσιμα, θα εμφανίζονται "απενεργοποιημένα"
                                    στην φόρμα κρατήσεων για την συγκεκριμένη ημέρα.</p>
                            </div>
                        </Col>
                        <Col xs={12} lg={4} xl={3}>
                            <CalendarSettings DinnerReservations={DinnerReservations}></CalendarSettings>
                        </Col>
                        <Col xs={12} lg={5} xl={7} className={'d-flex flex-column mt-3 mt-lg-0 text-center'}>
                            {selectedDate !== '' ? <SelectedDateSettings></SelectedDateSettings> :
                            <h5 className={'m-auto'}>Επιλέξτε μία ημέρα για να δείτε τις επιλογές σας.</h5>}
                        </Col>
                    </SelectedDateContext.Provider>
                </Row>
            </Row>
        </div>
    )
}
