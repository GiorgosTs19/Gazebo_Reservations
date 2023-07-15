import Calendar from "react-calendar";
import {useContext} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {useRef} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {ReservationsContext} from "../../../../../Contexts/ReservationsContext";
import {getAvailabilityByDate, isDateDisabledByAdmin} from "../../../../../ExternalJs/Util";
import {useEffect} from "react";

export function CalendarSettings() {
    const {settings,dispatchSetting} = useContext(SettingsContext),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date(settings.Last_Day),
        CalendarRef = useRef(null),
        {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        Reservations = useContext(ReservationsContext);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);
    const disabledDueToAvailability = (date) =>{
        const [current_date_availability,existingReservationsAllowed] = getAvailabilityByDate(date,Reservations);

        return Array.isArray(current_date_availability) && current_date_availability.length === 0;
    };

    const isDateDisabled = (date) => (date <= yesterday) || (date >= Last_Day)
        || disabledDueToAvailability(date);

    const handleDateChange = (date)=> {
        setSelectedDate(date);
    };

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date>today && date<Last_Day)
            return (view === 'month' && isDateDisabledByAdmin(date,Reservations)[0])
                ? 'disabled-day' : '';
    }



    return (
        <div className={'d-flex my-auto h-100'}>
            <Calendar className={'rounded shadow-sm m-auto'} tileDisabled={({ date }) => isDateDisabled(date)}
              inputRef={CalendarRef} showNeighboringMonth={false} value={selectedDate} onChange={handleDateChange}
              tileClassName={getTileClassName} prev2Label={null}>
            </Calendar>
        </div>
    )
}
