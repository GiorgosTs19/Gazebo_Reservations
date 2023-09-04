import {TodayViewSVG} from "../../../SVGS/TodayViewSVG";
import {WeeklyViewSVG} from "../../../SVGS/WeeklyViewSVG";
import {MonthlyViewSVG} from "../../../SVGS/MonthlyViewSVG";
import {SearchViewSVG} from "../../../SVGS/SearchViewSVG";
import {NavDropdown} from "react-bootstrap";
import {useContext} from "react";
import {ViewContext} from "../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";

export function NavBarReservations({activeTab}) {
    const {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {activeTabKey,handleSetActiveKey} = activeTab,
        handleSetActiveView = (view) => {
        if(activeTabKey !== 'Reservations')
            handleSetActiveView('Reservations');
        setActiveReservationsView(view);
        setActiveReservation(null);
        };

    return (
        <NavDropdown title="Κρατήσεις" id="navbarReservationsScrollingDropdown" className={'my-auto'}>
            <NavDropdown.Item href="#Σημερινές-Κρατήσεις" className={' secondarym-auto user-select-none ' + (activeReservationsView === 'Today' ? '' : 'cursor-pointer hover-scale-1_03')}
                onClick={()=>handleSetActiveView('Today')}
                disabled={activeReservationsView === 'Today'}>
                Σημερινές
            </NavDropdown.Item>
            <NavDropdown.Item href="#Εβδομαδιαίες-Κρατήσεις" className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Weekly' ? '' : 'cursor-pointer hover-scale-1_03')}
                onClick={()=>handleSetActiveView('Weekly')}
                disabled={activeReservationsView === 'Weekly'}>
                Εβδομαδιαίες
            </NavDropdown.Item>
            <NavDropdown.Item href="#Μηνιαίες-Κρατήσεις" className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Monthly' ? '' : 'cursor-pointer hover-scale-1_03')}
                onClick={()=>handleSetActiveView('Monthly')}
                disabled={activeReservationsView === 'Monthly'}>
                Μηνιαίες
            </NavDropdown.Item>
            <NavDropdown.Item href="#Αναζήτηση-Κρατήσεων" className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Search' ? '' : 'cursor-pointer hover-scale-1_03')}
                onClick={()=>handleSetActiveView('Search')}
                disabled={activeReservationsView === 'Search'}>
                Αναζήτηση
            </NavDropdown.Item>
        </NavDropdown>
    )
}
