import {useContext, useRef} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {MobileMonthlyView} from "./MobileMonthlyView";
import {LargeDevicesMonthlyView} from "./LargeDevicesMonthlyView";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import Calendar from "react-calendar";

export function MonthlyView() {
    const [selectedDate,setSelectedDate] = useState(''),
        CalendarRef = useRef(null),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date('2023-11-10'),
        Reservations = useContext(ReservationsContext),
        innerWidth = useContext(InnerWidthContext);
        yesterday.setDate(tomorrow.getDate() - 1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const isDateDisabled = (date,view,activeStartDate) => {
            if(view === 'month')
                return (date < yesterday) || (date >= Last_Day)
            if(view === 'year'){
                const currentMonth = new Date().getMonth();
                const selectedMonth = date.getMonth();

                return selectedMonth < currentMonth;
            }
            },
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        handleDateChange = (date)=> {
            setSelectedDate(date);
            setActiveReservation(null);
        },
        getTileContent = (date) => {
            if(!isDateDisabled(date)){
                const current_date_reservations = getReservationsByDate(date,Reservations);
                switch (current_date_reservations.length) {
                    case 0: {
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
    const reservationsToShow = ()=> {
        if(selectedDate === '')
            return <h4 className={'text-muted my-auto'}>Επιλέξτε ημέρα για να δείτε τις κρατήσεις της.</h4>;
        const reservations_of_current_date = getReservationsByDate(selectedDate,Reservations);
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto'}>Δεν υπάρχει κάποια κράτηση την ημέρα που επιλέξατε.</h4>;
        return reservations_of_current_date.map((reservation)=>{
            return <ReservationShort Reservation={reservation} key={reservation.id}></ReservationShort>;
        })
    };

    const reservations_of_current_date = selectedDate ?  getReservationsByDate(selectedDate,Reservations) : [];
    const [isDateDisabledByA,existingReservationsAllowed] = selectedDate ? isDateDisabledByAdmin(selectedDate,Reservations) : [false,true],
        hasReservations = Array.isArray(reservations_of_current_date) && reservations_of_current_date.length > 0;

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date>today && date<Last_Day)
            return (view === 'month' && isDateDisabledByAdmin(date,Reservations)[0])
                ? 'disabled-day' : '';
    }

    const CalendarToShow = <Calendar onChange={handleDateChange} value={selectedDate || today}
        className={'mx-auto rounded shadow'} inputRef={CalendarRef} tileClassName={getTileClassName}
        tileContent={({ activeStartDate , date, view }) => view === 'month' && getTileContent(date)}
        tileDisabled={({activeStartDate, date, view }) => isDateDisabled(date,view,activeStartDate)}
        prev2Label={null} next2Label={null} showNeighboringMonth={false} minDetail={'year'}/>

    const getWarningMessage = () => {
        if (isDateDisabledByA) {
            if(hasReservations) {
                switch (existingReservationsAllowed) {
                    case 1 : {
                        return <div>
                                    <h5 className={'text-warning'}>Έχετε θέσει την ημέρα ως μη διαθέσιμη!</h5>
                                    <h6  className={'text-warning'}>
                                        Οι παρακάτω κρατήσεις μπορούν να πραγματοποιηθούν.
                                    </h6>
                                </div>

                    }

                    case 0 : {
                        return <div>
                                    <h6  className={'text-warning'}>
                                        Οι παρακάτω κρατήσεις δεν μπορούν να πραγματοποιηθούν.
                                        ΠΡΕΠΕΙ να γίνει μεταφορά τους σε άλλη μέρα.
                                    </h6>
                                </div>

                    }
                }
            }
            return <h5 className={'text-warning'}>Έχετε θέσει την ημέρα ως μη διαθέσιμη!</h5>;
        }
    };

    return (
        innerWidth > 992
            ?
            <LargeDevicesMonthlyView Calendar={CalendarToShow}
                reservationsToShow={reservationsToShow} WarningMessage={getWarningMessage}>
            </LargeDevicesMonthlyView>
            :
            <MobileMonthlyView Calendar={CalendarToShow}
                reservationsToShow={reservationsToShow} WarningMessage={getWarningMessage}>
            </MobileMonthlyView>
    )
}
