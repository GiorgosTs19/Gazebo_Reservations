import {useCallback, useContext, useRef} from "react";
import {useState} from "react";
import {extractReservationsForDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {MobileMonthlyView} from "./MobileMonthlyView";
import {LargeDevicesMonthlyView} from "./LargeDevicesMonthlyView";
import {MonthlyCalendarSkeleton} from "../../../../Skeletons/MonthlyCalendarSkeleton";
import {useGetReservationsForRange} from "../../../../CustomHooks/useGetReservationsForRange";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {DatabaseSettingsContext} from "../../Contexts/DatabaseSettingsContext";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import Calendar from "react-calendar";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function MonthlyView() {
    const [selectedDate,setSelectedDate] = useState(''),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        innerWidth = useContext(InnerWidthContext),
        Settings = useContext(DatabaseSettingsContext).settings,
        CalendarRef = useRef(null),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        // Get the first day of the current month to initialize the activeRange. Also setting the Hours to 00:00:00 to match the
        // date set after the first render by the handleMonthChange function. If not done so, it triggers a second render and thus
        // a second fetch of the reservations after any action is taken, since the handleDateChange function is called again.
        first_Day_Of_Month = () => {
            const date = new Date();
            date.setDate(1);
            date.setHours(0, 0, 0, 0);
            return date;
        },
        Disabled_Days = useContext(DisabledDaysContext),
        lastDateOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0),
        Last_Day = new Date(Settings.Last_Day),
        [reservationsFilter,setReservationsFilter] = useState('All'),
        [activeRange,setActiveRange] = useState([first_Day_Of_Month(),lastDateOfCurrentMonth]),
        {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
        yesterday.setDate(today.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const [requestProgress, reservations, setReservations] = useGetReservationsForRange(activeRange, reservationType, [activeRange, reservationType]);
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
        handleMonthChange = (date) => {
            const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            setActiveRange([date,lastDateOfMonth]);
        },
        // Returns the content to be displayed in each of the calendar's tiles, based on the day's availability.
        getTileContent = (date) => {
            if(!isDateDisabled(date) && !isDateDisabledByAdmin(date,Disabled_Days)[0] && date > yesterday){
                const current_date_reservations = extractReservationsForDate(date,reservations);

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
                                return <h6 className={'m-0 user-select-none'} style={{color: '#828306'}}>{current_date_reservations.length}</h6>;
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
        if(activeRange[0].getMonth() === today.getMonth())
            return null;
        return "‹";
    };

    // Returns whether the toNextMonth button should be disabled ( True when viewing the last month,
    // based on the reservation date boundaries set by the administrators )

    const isNextLabelDisabled = () => {
        if(activeRange[0].getMonth()  === Last_Day.getMonth())
            return null;
        return "›";
    };
    // Will always try to show as many reservations per line, to save space.
    const reservationsToRender = (activeReservation !== null) ? 1 : (innerWidth > 1600 ? 3 : (innerWidth > 1400 ? (2) : (innerWidth > 1150 ? 3 : (innerWidth > 900 ? 2 : 1))));

    // Renders the reservations to show for the selected date.
    const reservationsToShow = useCallback(()=> {
        if(selectedDate === '')
            return [<h4 className={'text-muted my-auto user-select-none info-text-xl'}>Επιλέξτε ημέρα για να δείτε τις κρατήσεις της.</h4>,0];
        const reservations_of_current_date = extractReservationsForDate(selectedDate,reservations);

        if(reservations_of_current_date.length === 0)
            return [<h4 className={'text-muted my-auto user-select-none info-text-xl'}>Δεν υπάρχει κάποια κράτηση την ημέρα που επιλέξατε</h4>, reservations_of_current_date.length];

        const filteredReservations = reservationsFilter === 'All' ? reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return [<h4 className={'my-auto user-select-none info-text-xl'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια</h4>, reservations_of_current_date.length]

        const reservationChunks = [];
        for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
            reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
        }
        return [reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation =>
                    innerWidth < 500 ? <ReservationShortest Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-2 my-4'}/> : <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-2 my-4'}/>
                )}
            </div>
        )),reservations_of_current_date.length]
    },[selectedDate,reservationsFilter,reservationsToRender,reservations, innerWidth]);

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date>today && date<Last_Day)
            return isDateDisabledByAdmin(date,Disabled_Days)[0] ? ' disabled-day' : '';
    }

    const CalendarToShow = requestProgress === 'Pending' ? <MonthlyCalendarSkeleton activeStartDate={activeRange[0]}/> : <>
        <h6 className={'mb-4 mb-lg-0 user-select-none info-text'}>* Με <span className={'disabled-day'}>γραμμή</span> εμφανίζονται οι ημερομηνίες που έχετε απενεργοποιήσει</h6>
        <Calendar onChange={handleDateChange} value={selectedDate || today}
                  className={'m-auto rounded box_shadow'} inputRef={CalendarRef} tileClassName={getTileClassName}
                  tileContent={({ activeStartDate , date, view }) => view === 'month' && getTileContent(date)}
                  tileDisabled={({activeStartDate, date, view }) => isDateDisabled(date,view,activeStartDate)}
                  prev2Label={null} next2Label={null} showNeighboringMonth={false} minDetail={'month'}
                  onActiveStartDateChange={({ action, activeStartDate, value, view }) => handleMonthChange(activeStartDate)}
                  prevLabel={isPrevLabelDisabled()} nextLabel={isNextLabelDisabled()} activeStartDate={activeRange[0]}/>
    </>

    return (
        <ActiveRangeContext.Provider value={[activeRange, setReservations]}>
            {innerWidth > 1400
                ?
                <LargeDevicesMonthlyView Calendar={CalendarToShow} selectedDate={selectedDate}
                                         reservationsToShow={reservationsToShow} reservationsFilter={reservationsFilter}
                                         setReservationsFilter={setReservationsFilter}>
                </LargeDevicesMonthlyView>
                :
                <MobileMonthlyView Calendar={CalendarToShow} reservationsToShow={reservationsToShow}
                                   selectedDate={selectedDate} reservationsFilter={reservationsFilter}
                                   setReservationsFilter={setReservationsFilter}>
                </MobileMonthlyView>}
        </ActiveRangeContext.Provider>
    )
}
