import {useContext, useState,useRef} from "react";
import {DatabaseSettingsContext} from "../../Contexts/DatabaseSettingsContext";
import {SelectedDateContext} from "../../Contexts/SelectedDateContext";
import {Button, Form, Stack} from "react-bootstrap";
import {getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import Calendar from "react-calendar";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";

export function CalendarSettings({isInTableSettings = false, Reservations, disabledDaysForTable=[]}) {
    const {settings} = useContext(DatabaseSettingsContext),
        [canSelectRange,setCanSelectRange] = useState(false),
        Disabled_Days = useContext(DisabledDaysContext),
        today = new Date(),
        yesterday = new Date(today),
        tomorrow = new Date(today),
        Last_Day = new Date(settings.Last_Day),
        CalendarRef = useRef(null),
        {selectedDate, setSelectedDate}= useContext(SelectedDateContext);
        yesterday.setDate(yesterday.getDate() - 1);
        tomorrow.setDate(tomorrow.getDate() + 1);
    const [activeMonth,setActiveMonth] = useState(today.getMonth()),
    handleChangeCanSelectRange = () => {
        if(canSelectRange)
            setSelectedDate(['','']);
        else
            setSelectedDate('');
        setCanSelectRange(!canSelectRange);
    };

    const isDateDisabled = (date) => {
        if(canSelectRange)
            return (date <= yesterday) || (date >= Last_Day) || isDateDisabledByAdmin(date, Disabled_Days)[0] ||
                (isInTableSettings && (Disabled_Days?.includes(getFormattedDate(date, '-', 1))) || (isInTableSettings && disabledDaysForTable?.includes(getFormattedDate(date, '-', 1))))
        return (date <= yesterday) || (date >= Last_Day)
    }
            // || (isInTableSettings && Disabled_Days.includes(getFormattedDate(date,'-',1)) )));

    const handleDateChange = (date)=> {
        setSelectedDate(date);
    };

    const getTileClassName = ({ activeStartDate, date, view }) => {
        if(date >= yesterday && date < Last_Day)
            return isDateDisabledByAdmin(date,Disabled_Days)[0]
                ? 'disabled-day ' : '';
    }

    const isPrevLabelDisabled = () =>{
        if(activeMonth === today.getMonth())
            return null;
        return "‹";
    };

    const isNextLabelDisabled = () =>{
        if(activeMonth === Last_Day.getMonth())
            return null;
        return "›";
    };

    const getBoolean = (day,checking = 'Reservation') => {
        switch (isInTableSettings)  {
            case true : {
                return checking === 'Reservation' ? Reservations?.includes(getFormattedDate(day,'-',1)) :
                    disabledDaysForTable?.includes(getFormattedDate(day,'-',1));
            }
            case false : {
                return Reservations?.includes(getFormattedDate(day,'-',1));
            }
        }
    }

    const getTileContent = (day) => {
        if(isDateDisabledByAdmin(day,Disabled_Days)[0] || day > Last_Day || day < yesterday)
            return null;
        if(getBoolean(day,'Disabled'))
            return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#000000',width:'76%', height:'4px'}}></div>;
        if(day >= yesterday) {
            if(getBoolean(day,'Reservation'))
                return <div className={'my-2 mx-auto'}  style={{backgroundColor:'#F68908',width:'76%', height:'4px'}}></div>;
            return <div className={'my-2 mx-auto'} style={{backgroundColor:'#42C618',width:'76%', height:'4px'}}></div>
        }
    };

    return (
        <div className={'d-flex flex-column mx-0'}>
            <Stack direction={'horizontal'} className={'mx-auto border-bottom p1-3 mb-1 user-select-none'}>
                <h5>Μία Ημέρα</h5>
                <Form.Switch className={'mx-3'}
                 checked={canSelectRange}
                 onChange={()=>handleChangeCanSelectRange()}
                ></Form.Switch>
                <h5>Εύρος Ημερών</h5>
            </Stack>
            <Button className={'my-2 px-2 py-0 m-auto'} onClick={()=>setSelectedDate(canSelectRange ? [] : '')}
                    disabled={canSelectRange ? (selectedDate[0] === '' && selectedDate[1] === '') : selectedDate === ''}>Καθαρισμός επιλογής</Button>
            <h6 className={'mb-3 user-select-none info-text'}>* Με <span className={'disabled-day'}>γραμμή</span> εμφανίζονται οι ημερομηνίες που έχετε απενεργοποιήσει !</h6>
            <Calendar className={'rounded-5 m-auto admin-calendar'} tileDisabled={({ date }) => isDateDisabled(date)}
                      inputRef={CalendarRef} showNeighboringMonth={false} value={selectedDate} onChange={handleDateChange}
                      tileClassName={getTileClassName} prev2Label={null} next2Label={null} selectRange={canSelectRange}
                      nextLabel={isNextLabelDisabled()} prevLabel={isPrevLabelDisabled()} minDetail={'month'}
                      tileContent={({ activeStartDate , date, view }) => isInTableSettings && getTileContent(date)}
                      onActiveStartDateChange={({ action, activeStartDate, value, view }) => setActiveMonth(activeStartDate.getMonth())}>
            </Calendar>
            {isInTableSettings && <Stack>
                <Stack direction={innerWidth <= 500 ? 'vertical' : 'horizontal'} className={'mx-auto mt-2 mt-lg-5 user-select-none flex-wrap'}>
                    <div className={'mx-auto mx-sm-3 mt-3 mt-sm-0'} style={{backgroundColor:'#F68908',width:'25px', height:'4px'}}></div>
                    <span className={'mx-auto my-1 my-sm-0'}>Κρατημένο</span>
                    <div className={'mx-auto mx-sm-3  mt-3 mt-sm-0'} style={{backgroundColor:'#42C618',width:'25px', height:'4px'}}></div>
                    <span className={'mx-auto my-1 my-sm-0'}> Διαθέσιμο</span>
                    <div  className={'mx-auto mx-sm-3  mt-3 mt-sm-0'} style={{backgroundColor:'#000000',width:'25px', height:'4px'}}></div>
                    <span className={'mx-auto my-1 my-sm-0'}>Απενεργοποιημένο</span>
                </Stack>
            </Stack>}
        </div>
    )
}
