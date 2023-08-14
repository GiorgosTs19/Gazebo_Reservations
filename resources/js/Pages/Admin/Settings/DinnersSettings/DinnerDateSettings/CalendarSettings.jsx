import Calendar from "react-calendar";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {useRef} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {ReservationsContext} from "../../../../../Contexts/ReservationsContext";
import {getAvailabilityByDate, isDateDisabledByAdmin} from "../../../../../ExternalJs/Util";
import {Form, Stack} from "react-bootstrap";

export function CalendarSettings() {
    const {settings,dispatchSetting} = useContext(SettingsContext),
        [canSelectRange,setCanSelectRange] = useState(false),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date(settings.Last_Day),
        CalendarRef = useRef(null),
        {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        Reservations = useContext(ReservationsContext);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);
    useEffect(()=>{
       setSelectedDate('');
    },[canSelectRange]);
    const disabledDueToAvailability = (date) =>{
        const [current_date_availability,existingReservationsAllowed] = !Array.isArray(selectedDate) ? getAvailabilityByDate(date,Reservations) : [[],true];

        return Array.isArray(current_date_availability) && current_date_availability.length === 0;
    };

    const isDateDisabled = (date) => (date <= yesterday) || (date >= Last_Day)
        || (!Array.isArray(selectedDate) && disabledDueToAvailability(date));

    const handleDateChange = (date)=> {
        setSelectedDate(date);
    };

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date>today && date<Last_Day)
            return (view === 'month' && isDateDisabledByAdmin(date,Reservations)[0])
                ? 'disabled-day' : '';
    }
    return (
        <div className={'d-flex flex-column mx-0 h-100'}>
            <Stack direction={'horizontal'} className={'mx-auto border-bottom p1-3 mb-3'}>
                <h5>Μία Ημερομηνία</h5>
                <Form.Switch className={'mx-3'}
                             checked={canSelectRange}
                             onChange={()=>setCanSelectRange(!canSelectRange)}
                ></Form.Switch>
                <h5>Εύρος Ημερομηνιών</h5>
            </Stack>
            <Calendar className={'rounded box_shadow m-auto '} tileDisabled={({ date }) => isDateDisabled(date)}
              inputRef={CalendarRef} showNeighboringMonth={false} value={selectedDate} onChange={handleDateChange}
              tileClassName={getTileClassName} prev2Label={null} selectRange={canSelectRange}>
            </Calendar>
        </div>
    )
}
