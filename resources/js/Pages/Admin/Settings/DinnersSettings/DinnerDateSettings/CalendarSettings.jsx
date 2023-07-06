import Calendar from "react-calendar";
import {useContext} from "react";
import {SettingsContext} from "../../../Contexts/SettingsContext";
import {useRef} from "react";
import {SelectedDateContext} from "../../../Contexts/SelectedDateContext";
import {ReservationsContext} from "../../../../../Contexts/ReservationsContext";
import {getAvailabilityByDate} from "../../../../../ExternalJs/Util";

export function CalendarSettings() {
    const {settings,dispatchSetting} = useContext(SettingsContext),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date(settings.Last_Day),
        CalendarRef = useRef(null),
        {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
        DinnerReservations = useContext(ReservationsContext);

    const disabledDueToAvailability = (date) =>{
        const current_date_availability = getAvailabilityByDate(date,DinnerReservations,true);

        return Array.isArray(current_date_availability) && current_date_availability.length === 0;
    };

    const isDateDisabled = (date) => (today.getHours()<23 ? date < today : date<tomorrow) || date >= Last_Day
            || disabledDueToAvailability(date);

    const handleDateChange = (date)=> {
        setSelectedDate(date);
    };

    const getTileClassName = ({ activeStartDate, date, view }) => {
        return (view === 'month' && getAvailabilityByDate(date,DinnerReservations,true))
            ? 'disabled-day' : '';
    }

    return (
        <div className={'d-flex my-auto h-100'}>
            <Calendar className={'rounded shadow-sm m-auto'} tileDisabled={({ date }) => isDateDisabled(date)}
                      inputRef={CalendarRef} showNeighboringMonth={false} value={selectedDate} onChange={handleDateChange}
                      tileClassName={getTileClassName}>
            </Calendar>
        </div>
    )
}
