import Calendar from "react-calendar";
import {getAvailabilityByDate, getFormatedDate} from "../../../ExternalJs/Util";
import {useContext, useEffect, useState} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {ContainerRefContext} from "../../../Contexts/ContainerRefContext";
import {GazepoAvailabilityContext} from "../../../Contexts/GazepoAvailabilityContext";

export function ReservationCalendar() {
    const  {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    ContainerRef = useContext(ContainerRefContext),
    [selectedDate,setSelectedDate] = useState(null),
    today = new Date(),
    yesterday = new Date(today),
    tomorrow = new Date(today),
    Last_Day = new Date('2023-11-10'),
    Availability = useContext(GazepoAvailabilityContext),
    isDateDisabled = (date) => (today.getHours()<23 ? date < today : date<tomorrow) || date >= Last_Day,

    handleDateChange = (date)=> {
        setSelectedDate(date);
        setBookingDetails({...bookingDetails, date: getFormatedDate(date,'-',1)});
        ContainerRef.scrollTo({top: 0,behavior:'smooth'});
    },

    getTileContent = (date) => {
        // Calculate the date range for adding the element
        const startDate = new Date();
        startDate.setDate(startDate.getDate()); // Start from the next day
        if(!isDateDisabled(date)){
            const current_date_availability = getAvailabilityByDate(date,Availability);
            // Check if the date falls within the range
            if(current_date_availability)
                switch (current_date_availability) {
                    case 'All':
                        return <h5 className={'m-0'} style={{color:'#42C618'}}>&#9632;</h5>
                    // return <h6 className={'m-0'} style={{color:'#7CFC00'}}>&#9632;</h6>;
                    default : {
                        if (Array.isArray(current_date_availability)){
                            if(current_date_availability.length > 4)
                                return <h5 className={'m-0'} style={{color:'#42C618'}}>&#9632;</h5>;
                            else if(current_date_availability.length > 2 && current_date_availability.length <= 4)
                                return <h5 className={'m-0'} style={{color:'#E7EA2B'}}>&#9632;</h5>;
                            else if(current_date_availability.length > 0 && current_date_availability.length <= 2)
                                return <h5 className={'m-0'} style={{color:'#F68908'}}>&#9632;</h5>;
                            else if(current_date_availability.length === 0)
                                return <h5 className={'m-0'} style={{color:'#D2042D'}}>&#9632;</h5>;
                        }
                    }
                }

        }
        return null;
    }

    useEffect(()=>{
        yesterday.setDate(tomorrow.getDate() - 1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const Calendar = document.getElementsByClassName('react-calendar').item(0);
        Calendar.classList.add('rounded');
        Calendar.classList.add('shadow');
    },[]);


    return (
        <Calendar onChange={handleDateChange} value={selectedDate} tileDisabled={({ date }) => isDateDisabled(date)}
                  className={'mx-auto'} tileContent={({ activeStartDate , date, view }) =>
            view === 'month' && getTileContent(date)}/>
    )
}
