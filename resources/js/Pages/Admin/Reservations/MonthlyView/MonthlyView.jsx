import {useCallback, useContext, useRef} from "react";
import {useState} from "react";
import {getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {MobileMonthlyView} from "./MobileMonthlyView";
import {LargeDevicesMonthlyView} from "./LargeDevicesMonthlyView";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import Calendar from "react-calendar";
import {DatabaseSettingsContext} from "../../Contexts/DatabaseSettingsContext";

export function MonthlyView() {
    const [selectedDate,setSelectedDate] = useState(''),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        Reservations = useContext(ReservationsContext),
        innerWidth = useContext(InnerWidthContext),
        Settings = useContext(DatabaseSettingsContext).settings,
        CalendarRef = useRef(null),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date(Settings.Last_Day),
        [reservationsFilter,setReservationsFilter] = useState('All'),
        [activeMonth,setActiveMonth] = useState(today.getMonth());
        yesterday.setDate(today.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Checks if the date passed in the function has to be disabled on the calendar, either because this day has passed,
        // or is out of the reservation date boundaries set by the administrators.
        const isDateDisabled = (date,view,activeStartDate) => {
            if(view === 'month')
                return (date < yesterday) || (date > Last_Day)
        },
        // Handles the change of date on the calendar.
        handleDateChange = (date)=> {
                setSelectedDate(date);
                setActiveReservation(null);
        },
        // Returns the content to be displayed in each of the calendar's tiles, based on the day's availability.
        getTileContent = (date) => {
            if(!isDateDisabled(date) && !isDateDisabledByAdmin(date,Reservations)[0]){
                const current_date_reservations = getReservationsByDate(date,Reservations);
                switch (current_date_reservations.length) {
                    case 0: {
                        return <h6 className={'m-0 user-select-none'} style={{color: '#42C618'}}>0</h6>;
                    }
                    default : {
                        if (Array.isArray(current_date_reservations)) {
                            if(current_date_reservations.length < 2){
                                return <h6 className={'m-0 user-select-none'} style={{color:'#42C618'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length >= 2 && current_date_reservations.length < 4) {
                                return <h6 className={'m-0 user-select-none'} style={{color: '#E7EA2B'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length >= 4 && current_date_reservations.length < 6) {
                                return <h6 className={'m-0 user-select-none'} style={{color: '#F68908'}}>{current_date_reservations.length}</h6>;
                            }
                            else if(current_date_reservations.length === 6) {
                                return <h6 className={'m-0 user-select-none'} style={{color: '#D2042D'}}>{current_date_reservations.length}</h6>;
                            }
                        }
                    }
                }
                return null;
            }
        };

    // Returns whether the toPrevMonth button should be disabled ( True when viewing current month )
    const isPrevLabelDisabled = () =>{
        if(activeMonth === today.getMonth())
            return null;
        return "‹";
    };

    // Will always try to show as many reservations per line, to save space.
    const reservationsToRender = (activeReservation !== null) ? 1 : (innerWidth > 1500 ? 3 : (innerWidth > 800 ? 2 : 1));
    // Returns whether the toNextMonth button should be disabled ( True when viewing the last month,
    // based on the reservation date boundaries set by the administrators )

    const isNextLabelDisabled = () => {
        if(activeMonth === Last_Day.getMonth())
            return null;
        return "›";
    };

    // Renders the reservations to show for the selected date.
    const reservationsToShow = useCallback(()=> {
        if(selectedDate === '')
            return <h4 className={'text-muted my-auto user-select-none'}>Επιλέξτε ημέρα για να δείτε τις κρατήσεις της.</h4>;
        const reservations_of_current_date = getReservationsByDate(selectedDate,Reservations);

        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto user-select-none'}>Δεν υπάρχει κάποια κράτηση την ημέρα που επιλέξατε.</h4>;

        const filteredReservations = reservationsFilter === 'All' ? reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return <h4 className={'my-auto user-select-none'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια.</h4>

        const reservationChunks = [];
        for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
            reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
        }
        return reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation => (
                    <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-2 my-4'} />
                ))}
            </div>
        ))
    },[selectedDate,reservationsFilter,reservationsToRender,Reservations]);

    const reservations_of_current_date = selectedDate ?  getReservationsByDate(selectedDate,Reservations) : [];
    const [isDateDisabledByA,existingReservationsAllowed] = selectedDate ? isDateDisabledByAdmin(selectedDate,Reservations) : [false,true],
        hasReservations = Array.isArray(reservations_of_current_date) && reservations_of_current_date.length > 0;

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date>today && date<Last_Day)
            return isDateDisabledByAdmin(date,Reservations)[0] ? ' disabled-day' : '';
    }
    const CalendarToShow = <>
        <h6 className={'mb-4 mb-lg-0 user-select-none'}>* Με <span className={'disabled-day'}>γραμμή</span> εμφανίζονται οι ημερομηνίες που έχετε απενεργοποιήσει !</h6>
        <Calendar onChange={handleDateChange} value={selectedDate || today}
                  className={'m-auto rounded box_shadow'} inputRef={CalendarRef} tileClassName={getTileClassName}
                  tileContent={({ activeStartDate , date, view }) => view === 'month' && getTileContent(date)}
                  tileDisabled={({activeStartDate, date, view }) => isDateDisabled(date,view,activeStartDate)}
                  prev2Label={null} next2Label={null} showNeighboringMonth={false} minDetail={'month'}
                  onActiveStartDateChange={({ action, activeStartDate, value, view }) => setActiveMonth(activeStartDate.getMonth())}
                  prevLabel={isPrevLabelDisabled()} nextLabel={isNextLabelDisabled()}/>
    </>


    const getWarningMessage = () => {
        if (isDateDisabledByA) {
            if(hasReservations) {
                switch (existingReservationsAllowed) {
                    case 1 : {
                        return <div>
                                    <h5 className={'text-warning'}>Έχετε απενεργοποιήσει αυτή τη μέρα!</h5>
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
            return <h5 className={'text-warning'}>Έχετε απενεργοποιήσει αυτή τη μέρα!</h5>;
        }
    };

    return (
        innerWidth > 992
            ?
            <LargeDevicesMonthlyView Calendar={CalendarToShow} selectedDate = {selectedDate}
                reservationsToShow={reservationsToShow} WarningMessage={getWarningMessage}
            reservationsFilter={reservationsFilter} setReservationsFilter={setReservationsFilter}>
            </LargeDevicesMonthlyView>
            :
            <MobileMonthlyView Calendar={CalendarToShow}
                reservationsToShow={reservationsToShow} WarningMessage={getWarningMessage}
            selectedDate = {selectedDate}>
            </MobileMonthlyView>
    )
}
