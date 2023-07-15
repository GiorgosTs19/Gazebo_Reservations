import Calendar from "react-calendar";
import {
    getAvailabilityByDate, getAvailabilityPercentage,
    getFormattedDate,
    isDateDisabledByAdmin,
    isDateDisabledByAdminForReservations
} from "../../../ExternalJs/Util";
import {useContext, useEffect, useRef, useState} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {GazeboAvailabilityContext} from "../../../Contexts/GazeboAvailabilityContext";

export function ReservationCalendar() {
    const  {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    [selectedDate,setSelectedDate] = useState(bookingDetails.date ?? null),
    today = new Date(),
    yesterday = new Date(),
    twoDaysBefore = new Date(),
    tomorrow = new Date(),
    Last_Day = new Date('2023-11-10'),
    Availability = useContext(GazeboAvailabilityContext),
    CalendarRef = useRef(null),
    [activeMonth,setActiveMonth] = useState(today.getMonth()),
    disabledDueToAvailability = (date) =>{
        const current_date_availability = getAvailabilityByDate(date,Availability);
        return Array.isArray(current_date_availability) && current_date_availability.length === 0;

    };
    yesterday.setDate(today.getDate() - 1);
    tomorrow.setDate(today.getDate() + 1);
    twoDaysBefore.setDate(today.getDate()-2);

    const isPrevLabelDisabled = () =>{
       if(activeMonth === today.getMonth())
           return null;
       return "‹";
    };
    const isDateDisabled = (date) => {
        if(bookingDetails.type === 'Dinner')
            return (today.getHours()<23 ? date < today : date<tomorrow) || date >= Last_Day
            || disabledDueToAvailability(date) || isDateDisabledByAdminForReservations(date,Availability);
        return date < yesterday || date >= Last_Day || disabledDueToAvailability(date) || isDateDisabledByAdminForReservations(date,Availability);
        },

    handleDateChange = (date)=> {
        setSelectedDate(date);
        setBookingDetails({...bookingDetails, date: getFormattedDate(date,'-',1)});
    },

    getTileContent = (date) => {
        // Calculate the date range for adding the element
        const startDate = new Date();
        startDate.setDate(startDate.getDate()); // Start from the next day
        if(!isDateDisabled(date)) {
            const current_date_availability = getAvailabilityByDate(date,Availability);
            // Check if the date falls within the range
            if(current_date_availability)
                switch (current_date_availability) {
                    case 'All':
                        return <div className={'my-2 mx-auto'} style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>
                    default : {
                        if (Array.isArray(current_date_availability)){
                            if(current_date_availability.length > 4)
                                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
                            else if(current_date_availability.length > 2 && current_date_availability.length <= 4)
                                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#E7EA2B',width:'76%', height:'4px'}}></div>;
                            else if(current_date_availability.length > 0 && current_date_availability.length <= 2)
                                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#F68908',width:'76%', height:'4px'}}></div>;
                            else if(current_date_availability.length === 0)
                                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#D2042D',width:'76%', height:'4px'}}></div>;
                        }
                    }
                }
        }
        return null;
    };

    // const isTileHidden = ({ date, view }) => {
    //     if(bookingDetails.type === 'Dinner')
    //         return view === 'month' && date < today ? 'd-none' : null;
    //     return view === 'month' && date < yesterday ? 'd-none' : null
    // };

    return (
        <Calendar onChange={handleDateChange} value={selectedDate} tileDisabled={({ date }) => isDateDisabled(date)}
                  className={'mx-auto rounded shadow'} tileContent={({ activeStartDate , date, view }) =>
            view === 'month' && getTileContent(date)} inputRef={CalendarRef} showNeighboringMonth={false}
        prev2Label={null} next2Label={null} minDetail={'month'} prevLabel={isPrevLabelDisabled()}
        onActiveStartDateChange={({ action, activeStartDate, value, view }) => setActiveMonth(activeStartDate.getMonth())}
        tileClassName={''}/>
    )
}
