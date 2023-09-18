import {useContext, useRef} from "react";
import {
    extractReservationsForDate,
    getFirstAndLastDateOfMonth,
    isDateDisabledByAdmin
} from "../../../../ExternalJs/Util";
import Calendar from "react-calendar";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";

export function ChangeReservationDateCalendar({SelectedDate,className, setShowCalendar,
    rangeAvailability,activeDateRange, setActiveDateRange, last_day, children}) {
    const {selectedDate, setSelectedDate} = SelectedDate;
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    today = new Date(),
    yesterday = new Date(today),
    tomorrow = new Date(today),
    CalendarRef = useRef(null),
    Disabled_Days = useContext(DisabledDaysContext);

    yesterday.setDate(tomorrow.getDate() - 1)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const isDateDisabled = (date) => {
            if(date <= yesterday)
                return true;
            const isDisabledByAdmin = isDateDisabledByAdmin(date,Disabled_Days)[0];
            return (today.getHours()<23 ? date < today : date<tomorrow)
                || date >= last_day || isDisabledByAdmin;
        };

    const getTileContent = (date) => {
        // Calculate the date range for adding the element
        if(!isDateDisabled(date)) {
            const current_date_availability = extractReservationsForDate(date,rangeAvailability);
            // Check if the date falls within the range
            if(current_date_availability.length === 0)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
            if(current_date_availability.length < 2)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length >= 2 && current_date_availability.length <= 4)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#828306',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length >= 4 && current_date_availability.length < 6)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#F68908',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length === 6)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#D2042D',width:'76%', height:'4px'}}></div>;
        }
        return null;
    }

    // Checks if the previousMonth button on the calendar should be disabled.
    // It is disabled only when the viewing month is the same as the current month.
    const isPrevLabelDisabled = () =>{
        if(activeDateRange[0].getMonth() +1 === today.getMonth()+1)
            return null;
        return "‹";
    };
    // Checks if the nextMonth button on the calendar should be disabled.
    // It is disabled only when the viewing month is the same as the last date's month set by the admins.
    const isNextLabelDisabled = () => {
        if(activeDateRange[0].getMonth() + 1 === last_day.getMonth()+1)
            return null;
        return "›";
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    }

    const getTileClassName = (date) => {
        return  extractReservationsForDate(date,rangeAvailability).length === 6 ? 'disabled-day_transfer' : '';
    }

    return (
        <>
            {children}
            <Calendar onChange={handleDateChange} value={selectedDate} tileDisabled={({ date }) => isDateDisabled(date)}
              activeStartDate={activeDateRange[0]} tileClassName={({date})=>getTileClassName(date)}
              prev2Label={null} next2Label={null} className={'mx-auto rounded-5 shadow admin-calendar transfer-reservation-calendar ' + className} minDetail={'month'}
              tileContent={({date}) => getTileContent(date)}
              onActiveStartDateChange={({activeStartDate}) => {setActiveDateRange(getFirstAndLastDateOfMonth(activeStartDate.getMonth() + 1, last_day));}}
              inputRef={CalendarRef} showNeighboringMonth={false} prevLabel={isPrevLabelDisabled()} nextLabel={isNextLabelDisabled()}
              />
        </>
    )
}
