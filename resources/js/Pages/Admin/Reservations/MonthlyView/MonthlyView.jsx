import {useContext, useRef} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {getReservationsByDate} from "../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {MobileMonthlyView} from "./MobileMonthlyView";
import {LargeDevicesMonthlyView} from "./LargeDevicesMonthlyView";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function MonthlyView() {
    const [selectedDate,setSelectedDate] = useState(null),
        CalendarRef = useRef(null),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date('2023-11-10'),
        Reservations = useContext(ReservationsContext),
        innerWidth = useContext(InnerWidthContext);
        yesterday.setDate(tomorrow.getDate() - 1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const isDateDisabled = (date) => (date < yesterday) || (date >= Last_Day),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        handleDateChange = (date)=> {
            setSelectedDate(date);
            setActiveReservation(null);
        },
        getTileContent = (date) => {
            if(!isDateDisabled(date)){
                const current_date_reservations = getReservationsByDate(date,Reservations);
                switch (current_date_reservations) {
                    case 'None': {
                        return <h6 className={'m-0'} style={{color: '#42C618'}}>0</h6>;
                    }
                    default : {
                        if (Array.isArray(current_date_reservations)) {
                            if(current_date_reservations.length < 2){
                                return <h6 className={'m-0'} style={{color:'#42C618'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length >= 2 && current_date_reservations.length < 4) {
                                return <h6 className={'m-0'} style={{color: '#E7EA2B'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length >= 4 && current_date_reservations.length < 6) {
                                return <h6 className={'m-0'} style={{color: '#F68908'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length === 6) {
                                return <h6 className={'m-0'} style={{color: '#D2042D'}}>{current_date_reservations.length}</h6>;
                            }
                        }
                    }
                }
                return null;
            }
        };
    const reservationsToShow = ()=>{
        if(!selectedDate)
            return <h4 className={'text-muted my-auto'}>Επιλέξτε ημέρα για να δείτε τις κρατήσεις της.</h4>;
        const reservations_of_current_date = getReservationsByDate(selectedDate,Reservations);
        if(reservations_of_current_date === 'None')
            return <h4 className={'text-muted my-auto'}>Δεν υπάρχει κάποια κράτηση την ημέρα που επιλέξατε.</h4>;
        return reservations_of_current_date.map((reservation)=>{
            return <ReservationShort Reservation={reservation} key={reservation.id}></ReservationShort>;
        })
    };

    useEffect(()=>{
        CalendarRef.current?.classList.add('rounded');
        CalendarRef.current?.classList.add('shadow');
    },[CalendarRef.current]);



    return (
        innerWidth > 992
            ?
            <LargeDevicesMonthlyView handleDateChange={handleDateChange} selectedDate={selectedDate} today={today}
                                     CalendarRef={CalendarRef} getTileContent={getTileContent} isDateDisabled={isDateDisabled} reservationsToShow={reservationsToShow}>
            </LargeDevicesMonthlyView>
            :
            <MobileMonthlyView handleDateChange={handleDateChange} selectedDate={selectedDate} today={today}
                               CalendarRef={CalendarRef} getTileContent={getTileContent} isDateDisabled={isDateDisabled} reservationsToShow={reservationsToShow}>
            </MobileMonthlyView>
    )
}
