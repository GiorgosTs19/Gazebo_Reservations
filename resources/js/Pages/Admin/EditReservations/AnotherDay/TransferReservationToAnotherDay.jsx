import {ChangeReservationDateCalendar} from "./ChangeReservationDateCalendar";
import {useState,useContext} from "react";
import {changeDateFormat, getFirstAndLastDateOfMonth, getFormattedDate, getTableAA,} from "../../../../ExternalJs/Util";
import {ChevronDownSVG} from "../../../../SVGS/ChevronDownSVG";
import {ChevronUpSVG} from "../../../../SVGS/ChevronUpSVG";
import {Row} from "react-bootstrap";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {DatabaseSettingsContext} from "../../Contexts/DatabaseSettingsContext";
import {useGetAvailabilityForRange} from "../../../../CustomHooks/useGetAvailabilityForRange";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";
import {TablesList} from "./TablesList";
import {useGetAvailabilityForDate} from "../../../../CustomHooks/useGetAvailabilityForDate";


export function TransferReservationToAnotherDay({edit}) {
    const [selectedDate,setSelectedDate] = useState(null),
    Gazebos = useContext(GazebosContext);
    // A boolean to indicate if all tables will be shown in the list, or just the ones that can actually be selected,
    // basically the available ones.
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const date = selectedDate ? getFormattedDate(selectedDate) : null;
    const [selectedTable,setSelectedTable] = useState('');
    const [showCalendar, setShowCalendar] = useState(true);
    const Settings = useContext(DatabaseSettingsContext).settings,
    today = new Date(),
    Last_Day = new Date(Settings.Last_Day),
    [activeDateRange,setActiveDateRange] = useState(getFirstAndLastDateOfMonth(today.getMonth()+1, Last_Day));
    const [requestProgress, availability, setAvailability] = useGetAvailabilityForRange(activeDateRange, activeReservation.Type, [activeDateRange]);

    const [selectedDateRequestProgress, selectedDateAvailability, setSelectedDateAvailability] = useGetAvailabilityForDate(selectedDate, activeReservation.Type,
        [selectedDate],selectedDate !== null);
    return (
        <>
            <Row className={'mb-1 h-100'}>
                <p className={'info-text-lg mb-1'}>Τρέχουσες Πληροφορίες Κράτησης</p>
                <p className={'border-bottom pb-2 mb-1'}>
                    <span className={'info-text'}>Ημερομηνία : <i>{changeDateFormat(activeReservation.Date,'-','-')}</i>, </span>
                    <span className={'info-text'}>Gazebo : <i>{getTableAA(activeReservation.Gazebo,Gazebos)}</i></span>
                </p>
            </Row>
            <div className={'my-1 h-100 text-center'}>
                    {!selectedDate && <h6 className={'info-text mb-2'}>Επιλέξτε νέα ημέρα κράτησης</h6>}
                    {showCalendar ? (requestProgress === 'Pending' ? <SpinnerSVG/> : <>
                        <ChevronUpSVG onClick={()=>setShowCalendar(false)}/>
                        <ChangeReservationDateCalendar
                            SelectedDate={{selectedDate, setSelectedDate}}
                            rangeAvailability={availability}
                            setActiveDateRange={setActiveDateRange}
                            last_day={Last_Day}
                            activeDateRange={activeDateRange}
                            className={'h-100'} setShowCalendar={setShowCalendar}>
                        </ChangeReservationDateCalendar>
                    </> ) : <section className={'my-2 mx-auto cursor-pointer border border-1 p-1 rounded-3 w-fit-content px-4'} onClick={()=>setShowCalendar(true)}>
                        <span className={'info-text-lg '}>Εμφάνιση Ημερολογίου</span>
                        <ChevronDownSVG/>
                    </section>}
                {selectedDate && !showCalendar && <TablesList selectedTable={selectedTable} activeDateRange={activeDateRange} date={date} setSelectedTable={setSelectedTable}
                selectedDate={selectedDate} setShowCalendar={setShowCalendar} edit={edit} availability={selectedDateAvailability} requestProgress={selectedDateRequestProgress}
                showCalendar={showCalendar}/>}
            </div>
        </>
    )
}
