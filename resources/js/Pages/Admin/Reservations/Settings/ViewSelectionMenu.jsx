import {Button, Form, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {useContext} from "react";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {TodayViewSVG} from "../../../../SVGS/TodayViewSVG";
import {WeeklyViewSVG} from "../../../../SVGS/WeeklyViewSVG";
import {MonthlyViewSVG} from "../../../../SVGS/MonthlyViewSVG";
import {SearchViewSVG} from "../../../../SVGS/SearchViewSVG";
import {getFormattedDate} from "../../../../ExternalJs/Util";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";

export function ViewSelectionMenu() {
    const {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    handleSetActiveView = (view) =>{
        setActiveReservationsView(view);
        setActiveReservation(null);
    }
    const getReservationViewText = () => {
        switch (activeReservationsView) {
            case 'Today' : return `Σημερινές Κρατήσεις ${reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}`;
            case 'Weekly' : return `Κρατήσεις ανά εβδομάδα ${reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}`;
            case 'Monthly' : return `Κρατήσεις ανά μήνα ${reservationType === 'Dinner' ? 'Seaside Dinner' : 'Sea Bed'}`;
            case 'Search' : return 'Αναζήτηση Κρατήσεων'
        }
    };

    const TodayViewIcon = <TodayViewSVG className={'m-auto user-select-none ' + (activeReservationsView === 'Today' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Today')}
        disabled={activeReservationsView === 'Today'}/>,

    WeeklyViewIcon = <WeeklyViewSVG className={'m-auto user-select-none ' + (activeReservationsView === 'Weekly' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Weekly')}
        disabled={activeReservationsView === 'Weekly'}/>,

    MonthlyViewIcon = <MonthlyViewSVG className={'m-auto user-select-none ' + (activeReservationsView === 'Monthly' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Monthly')}
        disabled={activeReservationsView === 'Monthly'}/>,

    SearchViewIcon =<SearchViewSVG className={'m-auto user-select-none ' + (activeReservationsView === 'Search' ? '' : 'cursor-pointer')} height={36} width={36} onClick={()=>handleSetActiveView('Search')}
        disabled={activeReservationsView === 'Search'}/>;



    return (
        <>
            <h5 className={'user-select-none mb-2 px-2 px-md-0'}>{getReservationViewText()}</h5>
            <ListGroup horizontal className={'p-0 my-auto'}>
                {TodayViewIcon}
                {WeeklyViewIcon}
                {MonthlyViewIcon}
                {SearchViewIcon}
            </ListGroup>
        </>
    )
}
