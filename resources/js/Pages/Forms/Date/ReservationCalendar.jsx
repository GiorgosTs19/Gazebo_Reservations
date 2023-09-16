import Calendar from "react-calendar";
import {
    extractReservationsForDate,
    getFirstAndLastDateOfMonth,
    getFormattedDate,
    isDateDisabledByAdmin,
} from "../../../ExternalJs/Util";
import {useCallback, useContext, useRef, useState} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {DatabaseSettingsContext} from "../../Admin/Contexts/DatabaseSettingsContext";
import {useGetAvailabilityForRange} from "../../../CustomHooks/useGetAvailabilityForRange";
import {DisabledDaysContext} from "../../Admin/Contexts/DisabledDaysContext";

export function ReservationCalendar() {
    const  {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Settings = useContext(DatabaseSettingsContext),
    today = new Date(),
    yesterday = new Date(),
    twoDaysBefore = new Date(),
    tomorrow = new Date(),
    lastDay = new Date(Settings.Ending_Date),
    CalendarRef = useRef(null);
    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);
    twoDaysBefore.setDate(today.getDate()-2);
    const Disabled_Days = useContext(DisabledDaysContext);
    const [activeRange, setActiveRange] = useState(getFirstAndLastDateOfMonth(today.getMonth()+1, lastDay));

    // Retrieves the availability of the currently viewing month.
    const [requestProgress, availability, setReservations] = useGetAvailabilityForRange(activeRange, bookingDetails.type,
    [activeRange]);

    // Checks if the previousMonth button on the calendar should be disabled.
    // It is disabled only when the viewing month is the same as the current month.
    const isPrevLabelDisabled = () =>{
       if(activeRange[0].getMonth()+1 === today.getMonth()+1)
           return null;
       return "‹";
    };
    // Checks if the nextMonth button on the calendar should be disabled.
    // It is disabled only when the viewing month is the same as the last date's month set by the admins.
    const isNextLabelDisabled = () =>{
       if(activeRange[0].getMonth()+1 === lastDay.getMonth()+1)
           return null;
       return "›";
    };
    // Checks if the given date should show as disabled in the calendar.
    // If the date is before today, after the last date set by the admins, or if it is contained in the Disabled_Days array,
    // then it should be disabled. Different restrictions apply for each reservation Type.
    // For Dinners current day ( today ) should be disabled, as well as the next day ( tomorrow ) if you're viewing after
    // 23:00 hours today, while for Sun Beds, it shouldn't.
    const isDateDisabled = (date) => {
        if(bookingDetails.type === 'Dinner')
            return (today.getHours()<23 ? date < today : date<tomorrow) || date > lastDay
            || isDateDisabledByAdmin(date,Disabled_Days)[0];
        return date < yesterday || date >= lastDay || isDateDisabledByAdmin(date,Disabled_Days)[0];
    },
        // Handles setting of the booking's date, each time the user selects a different date.
    handleDateChange = (date)=> {
        if(getFormattedDate(date,'-',1) !== bookingDetails.date)
            setBookingDetails({...bookingDetails, date: getFormattedDate(date,'-',1)});
    },
    // Gets the tile content for each 'day' in the calendar. It pretty much shows a colored div,
    // based on the reservations that exist on that day, to indicate the availability of that day.

    getTileContent = useCallback((date) => {
        // Calculate the date range for adding the element
        const startDate = new Date();
        startDate.setDate(startDate.getDate()); // Start from the next day
        if(!isDateDisabled(date)) {
            const current_date_availability = extractReservationsForDate(date,availability);
            // Check if the date falls within the range
            if(current_date_availability.length === 0)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
            if(current_date_availability.length < 2)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length === 2)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#eef507',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length > 2 && current_date_availability.length <= 4)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#F68908',width:'76%', height:'4px'}}></div>;
            else if(current_date_availability.length > 4)
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#D2042D',width:'76%', height:'4px'}}></div>;
        }
        return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#555557',width:'76%', height:'4px'}}></div>;
    },[availability]);

    const getTileClassName = useCallback((date) => {
        if(isDateDisabled(date))
            return 'disabled';
        return '';
    },[activeRange]);

    return (
        <Calendar onChange={handleDateChange} value={bookingDetails.date ?? null} tileDisabled={({ date }) => isDateDisabled(date)}
        className={'mx-auto my-2 rounded-5 calendar'} tileContent={({date, view }) => view === 'month' && getTileContent(date)} inputRef={CalendarRef} showNeighboringMonth={false}
        prev2Label={null} next2Label={null} minDetail={'month'} prevLabel={isPrevLabelDisabled()} nextLabel={isNextLabelDisabled()}
        onActiveStartDateChange={({activeStartDate}) => setActiveRange(getFirstAndLastDateOfMonth(activeStartDate.getMonth()+1, lastDay))}
        tileClassName={({date}) => getTileClassName(date)}/>
    )
}
