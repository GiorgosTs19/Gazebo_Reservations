import {Stack} from "react-bootstrap";
import {useContext} from "react";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function ViewSelectionMenu() {
    const {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    handleSetActiveView = (view) =>{
        setActiveReservationsView(view);
        setActiveReservation(null);
    }

    const TodayViewIcon = <h6 className={`flex-fill user-select-none info-text-lg ${activeReservationsView === 'Today' ? 'opacity-25' : ''}`
    + (activeReservationsView === 'Today' ? '' : 'cursor-pointer hover-scale-1_1')}
    onClick={()=>handleSetActiveView('Today')}>Σημερινές</h6>,

    WeeklyViewIcon = <h6 className={`flex-fill user-select-none info-text-lg ${activeReservationsView === 'Weekly' ? 'opacity-25' : ''}`
    + (activeReservationsView === 'Weekly' ? '' : 'cursor-pointer hover-scale-1_1')}
    onClick={()=>handleSetActiveView('Weekly')}>Εβδομαδιαίες</h6>,

    MonthlyViewIcon = <h6 className={`flex-fill user-select-none info-text-lg ${activeReservationsView === 'Monthly' ? 'opacity-25' : ''}`
    + (activeReservationsView === 'Monthly' ? '' : 'cursor-pointer hover-scale-1_1')}
    onClick={()=>handleSetActiveView('Monthly')}>Μηνιαίες</h6>,

    SearchViewIcon =<h6 className={`flex-fill user-select-none info-text-lg ${activeReservationsView === 'Search' ? 'opacity-25' : ''} ` +
    (activeReservationsView === 'Search' ? '' : 'cursor-pointer hover-scale-1_1')}
    onClick={()=>handleSetActiveView('Search')}>Αναζήτηση</h6>;

    return (
        <Stack direction={"horizontal"} className={'p-0 my-auto'} >
            {TodayViewIcon}
            {WeeklyViewIcon}
            {MonthlyViewIcon}
            {SearchViewIcon}
        </Stack>
    )
}
