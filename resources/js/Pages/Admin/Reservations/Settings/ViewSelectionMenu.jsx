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

export function ViewSelectionMenu() {
    const {activeView,setActiveView} = useContext(ViewContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    handleSetActiveView = (view) =>{
        setActiveView(view);
        setActiveReservation(null);
    }

    const TodayViewIcon = <TodayViewSVG className={'m-auto user-select-none ' + (activeView === 'Today' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Today')}
        disabled={activeView === 'Today'}/>,

    WeeklyViewIcon = <WeeklyViewSVG className={'m-auto user-select-none ' + (activeView === 'Weekly' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Weekly')}
        disabled={activeView === 'Weekly'}/>,

    MonthlyViewIcon = <MonthlyViewSVG className={'m-auto user-select-none ' + (activeView === 'Monthly' ? '' : 'cursor-pointer')} height={52} width={52} onClick={()=>handleSetActiveView('Monthly')}
        disabled={activeView === 'Monthly'}/>,

    SearchViewIcon =<SearchViewSVG className={'m-auto user-select-none ' + (activeView === 'Search' ? '' : 'cursor-pointer')} height={36} width={36} onClick={()=>handleSetActiveView('Search')}
        disabled={activeView === 'Search'}/>;



    return (
        <div className={'box_shadow px-0 px-xl-4 rounded-4 py-2 border'}>
            <h5 className={'user-select-none'}>Εμφάνιση Κρατήσεων</h5>
            <ListGroup horizontal className={'p-0 my-auto'}>
                {TodayViewIcon}
                {WeeklyViewIcon}
                {MonthlyViewIcon}
                {SearchViewIcon}
            </ListGroup>
        </div>
    )
}
