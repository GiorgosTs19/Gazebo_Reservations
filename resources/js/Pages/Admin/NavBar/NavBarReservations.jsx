import {NavDropdown} from "react-bootstrap";
import {useContext} from "react";
import {ViewContext} from "../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";

export function NavBarReservations({activeTab}) {
    const {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {activeTabKey,handleSetActiveKey} = activeTab,
    handleSetActiveView = (view) => {
        if(activeTabKey !== 'Reservations'){
            handleSetActiveKey('Reservations');
        }
        setActiveReservationsView(view);
        setActiveReservation(null);
    };

    return (
        <NavDropdown title="Κρατήσεις" id="navbarReservationsScrollingDropdown" className={'my-auto'}>
            <NavDropdown.Item href="#Σημερινές-Κρατήσεις" onClick={()=>handleSetActiveView('Today')}
                className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Today' ? '' : 'cursor-pointer hover-scale-1_03')}
                disabled={activeReservationsView === 'Today' && activeTabKey === 'Reservations'}>
                Σημερινές
            </NavDropdown.Item>
            <NavDropdown.Item href="#Εβδομαδιαίες-Κρατήσεις" onClick={()=>handleSetActiveView('Weekly')}
                className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Weekly' ? '' : 'cursor-pointer hover-scale-1_03')}
                disabled={activeReservationsView === 'Weekly'  && activeTabKey === 'Reservations'}>
                Εβδομαδιαίες
            </NavDropdown.Item>
            <NavDropdown.Item href="#Μηνιαίες-Κρατήσεις" onClick={()=>handleSetActiveView('Monthly')}
                className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Monthly' ? '' : 'cursor-pointer hover-scale-1_03')}
                disabled={activeReservationsView === 'Monthly'  && activeTabKey === 'Reservations'}>
                Μηνιαίες
            </NavDropdown.Item>
            <NavDropdown.Item href="#Ακυρωμένες-Κρατήσεις" onClick={()=>handleSetActiveView('Cancelled')}
                className={'secondary m-auto user-select-none text-danger ' + (activeReservationsView === 'Monthly' ? '' : 'cursor-pointer hover-scale-1_03')}
                disabled={activeReservationsView === 'Cancelled'  && activeTabKey === 'Reservations'}>
                Ακυρωμένες
            </NavDropdown.Item>
            <NavDropdown.Item href="#Αναζήτηση-Κρατήσεων" onClick={()=>handleSetActiveView('Search')}
                className={'secondary m-auto user-select-none ' + (activeReservationsView === 'Search' ? '' : 'cursor-pointer hover-scale-1_03')}
                disabled={activeReservationsView === 'Search'  && activeTabKey === 'Reservations'}>
                Αναζήτηση
            </NavDropdown.Item>
        </NavDropdown>
    )
}
