import {useState} from "react";
import {useContext} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesWeeklyView} from "./LargeDevicesWeeklyView";
import {MobileWeeklyView} from "./MobileWeeklyView";
import {Button} from "react-bootstrap";
import {getFormattedDate} from "../../../../ExternalJs/Util";
import {DatabaseSettingsContext} from "../../Contexts/DatabaseSettingsContext";
import {useGetReservationsForRange} from "../../../../CustomHooks/useGetReservationsForRange";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function WeeklyReservationsView() {
    const [currentDate, setCurrentDate] = useState(new Date()),
    innerWidth = useContext(InnerWidthContext),
    [reservationsFilter,setReservationsFilter] = useState('All'),
    Settings = useContext(DatabaseSettingsContext).settings,
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(currentDate.getDate() + 7);
    const activeRange = [new Date(currentDate.getTime()),oneWeekLater],
    [requestProgress, reservations, setReservations] = useGetReservationsForRange(activeRange,reservationType,[currentDate, reservationType]);
    // Checks if the currentDate is Today to disable the goToPreviousWeek button.
    const isToday = getFormattedDate(currentDate,'/',2) === getFormattedDate(new Date(),'/',2);

    // Checks if the currentDate with 7 days added to it is after the last day set by the admins, to disable the goToNextWeek button.
    const isLastWeek = new Date(currentDate.addDays(7)) > new Date(Settings.Last_Day);

    // Handles the next goToPreviousWeek button click.
    const goToPreviousWeek = () => {
        if(isToday)
            return;
        const previousWeek = new Date(currentDate.getTime());
        previousWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(previousWeek);
    };

    // Handles the next goToNextWeek button click.
    const goToNextWeek = () => {
        if(isLastWeek)
            return;
        const nextWeek = new Date(currentDate.getTime());
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    return (
        <ActiveRangeContext.Provider value={[activeRange, setReservations]}>
            {innerWidth > 1200
                ?
                <LargeDevicesWeeklyView currentDate={currentDate} navigateWeeks={{goToPreviousWeek, goToNextWeek}}
                                        filter={{reservationsFilter, setReservationsFilter}} isToday={isToday}
                                        isLastWeek={isLastWeek}
                                        propsReservations={reservations}>
                </LargeDevicesWeeklyView>
                :
                <MobileWeeklyView currentDate={currentDate} filter={{reservationsFilter, setReservationsFilter}}
                                  Reservations={[reservations, setReservations]}>
                    <Button onClick={goToPreviousWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'}
                            disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'}
                            disabled={isLastWeek}>Επόμενη Εβδομάδα</Button>
                </MobileWeeklyView>}
        </ActiveRangeContext.Provider>
    );
}
