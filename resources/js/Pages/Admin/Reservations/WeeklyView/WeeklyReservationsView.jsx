import {useState} from "react";
import {useContext} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesWeeklyView} from "./LargeDevicesWeeklyView";
import {MobileWeeklyView} from "./MobileWeeklyView";
import {Button} from "react-bootstrap";
import {getFormattedDate} from "../../../../ExternalJs/Util";

export function WeeklyReservationsView() {
    const [currentDate, setCurrentDate] = useState(new Date()),
    innerWidth = useContext(InnerWidthContext),
    [reservationsFilter,setReservationsFilter] = useState('All');

    const goToPreviousWeek = () => {
        const previousWeek = new Date(currentDate.getTime());
        previousWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(previousWeek);
    };

    const goToNextWeek = () => {
        const nextWeek = new Date(currentDate.getTime());
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const isToday = getFormattedDate(currentDate,'/',2) === getFormattedDate(new Date(),'/',2);
    return (
        <>
            {innerWidth > 1200
                ?
                <LargeDevicesWeeklyView currentDate={currentDate}
                    filter={{reservationsFilter,setReservationsFilter}}>
                    <Button onClick={goToPreviousWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'}>Επόμενη Εβδομάδα</Button>
                </LargeDevicesWeeklyView>
                :
                <MobileWeeklyView currentDate={currentDate} filter={{reservationsFilter,setReservationsFilter}}>
                    <Button onClick={goToPreviousWeek} variant={"outline-dark"} size={'sm'} className={'m-2 m-md-auto rounded-3'} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2 m-md-auto rounded-3'}>Επόμενη Εβδομάδα</Button>
                </MobileWeeklyView>
            }
        </>
    );
}
