import {useContext, useRef, useState} from "react";
import {getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import Calendar from "react-calendar";
import {Inertia} from "@inertiajs/inertia";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";

export function ChangeReservationDateCalendar({SelectedDateAvailability,className}) {
    const {selectedDateAvailability,setSelectedDateAvailability} = SelectedDateAvailability;
    const [selectedDate,setSelectedDate] = useState(''),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date('2023-11-10'),
        CalendarRef = useRef(null),
        Disabled_Days = useContext(DisabledDaysContext);

        yesterday.setDate(tomorrow.getDate() - 1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const isDateDisabled = (date) => {
                if(date <= yesterday)
                    return true;
                const isDisabledByAdmin = isDateDisabledByAdmin(date,Disabled_Days)[0];
                return (today.getHours()<23 ? date < today : date<tomorrow)
                    || date >= Last_Day || isDisabledByAdmin;
            },

        handleDateChange = (date)=> {
            Inertia.get(route('Get_Availability_For_Date'), {date: getFormattedDate(date,'-',1), type:reservationType, exceptCancelled:true},{
                only:['availability_for_date'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    setSelectedDate(date);
                    setSelectedDateAvailability([getFormattedDate(date,'-',1),res.props.availability_for_date]);
                }
            });
        };

        // getTileContent = (date) => {
        //     // Calculate the date range for adding the element
        //     const startDate = new Date();
        //     startDate.setDate(startDate.getDate()); // Start from the next day
        //     if(!isDateDisabled(date)) {
        //         // const current_date_availability = getAvailabilityByDate(date,Reservations);
        //         const [noOfAvailableTables,TotalTables,Ratio] = selectedDateAvailability ? getAvailabilityPercentage(selectedDateAvailability[1])
        //         : [1,1,1];
        //         // Check if the date falls within the range
        //         if(Ratio > 0.8)
        //             return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>;
        //         else if(Ratio <= 0.8 && Ratio > 0.4)
        //             return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#E7EA2B',width:'76%', height:'4px'}}></div>;
        //         else if(Ratio <= 0.4  && Ratio > 0)
        //             return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#F68908',width:'76%', height:'4px'}}></div>;
        //         else if(Ratio === 0)
        //             return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#D2042D',width:'76%', height:'4px'}}></div>;
        //     }
        //     return null;
        // }


    const [activeMonth,setActiveMonth] = useState(today.getMonth());
    const isPrevLabelDisabled = () =>{
        if(activeMonth === today.getMonth())
            return null;
        return "‹";
    };

    const getTileClassName = (date) => {
        // const dateAvailability = getAvailabilityByDate(date,Reservations);
        // if(dateAvailability) {
        //     const dateIsNotAvailable = dateAvailability.every((table)=>{
        //         return table.isAvailable === false;
        //     });
        //     if(dateIsNotAvailable)
        //         return 'disabled-day_transfer'
        // }
        return '';
    }

    return (
        <Calendar onChange={handleDateChange} value={selectedDate} tileDisabled={({ date }) => isDateDisabled(date)}
            prev2Label={null} next2Label={null} className={'mx-auto rounded shadow ' + className} minDetail={'month'}
            // tileContent={({ activeStartDate , date, view }) => view === 'month' && getTileContent(date)}
            onActiveStartDateChange={({ action, activeStartDate, value, view }) => setActiveMonth(activeStartDate.getMonth())}
            inputRef={CalendarRef} showNeighboringMonth={false} prevLabel={isPrevLabelDisabled()}
            tileClassName={({date})=>getTileClassName(date)}/>
    )
}
