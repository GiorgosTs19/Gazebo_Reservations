import {getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {Button, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {useCallback, useContext, useEffect, useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {LargeWeekDayDisplay} from "./LargeWeekDayDisplay";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {useRenderWeeklyReservations} from "../../../../CustomHooks/useRenderWeeklyReservations";

export function LargeDevicesWeeklyView({currentDate, direction, filter, navigateWeeks, isToday, isLastWeek}) {
    const Reservations = useContext(ReservationsContext),
    [showFilters,setShowFilters] = useState(false),
    {reservationsFilter, setReservationsFilter} = filter,
    [largeWeekDay,setLargeWeekDay] = useState([null,[]]),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);

    // Generates the days of the active week and counts the total amount of reservations for that week.
    const generateWeekDays = useCallback(() => {
        let totalWeekReservations = 0;
        return [Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            day.setDate(currentDate.getDate() + index);
            const [reservations,reservationsCount,totalReservations,unlistedReservations] = useRenderWeeklyReservations(day, Reservations, reservationsFilter,setLargeWeekDay);
            totalWeekReservations += totalReservations;
            return <ListGroup.Item className={'my-2 d-flex flex-column box_shadow '} key={index}>
                <div className={'d-flex flex-row'}>
                    {/*{reservationsCount >= 3 && }*/}
                    {reservationsCount > 0 && <p className={'my-2 border-bottom py-2 px-4 box_shadow rounded-5 mx-auto user-select-none'} style={{width:'fit-content'}}>
                        {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount)}</p>}
                </div>
                <Stack direction={'horizontal'} key={'Stack'} className={''}>
                    <h3 className={'me-1 border-end pe-3 user-select-none ' + (isDateDisabledByAdmin(day,Reservations)[0] ? 'disabled-day' : '')}>
                        {getFormattedDate(day,'/',3)}
                    </h3>
                    <ListGroup horizontal={'xl'} gap={5} className={'p-1 scrollable-x-not-vw mt-2 '} style={{overflowX:'auto'}} key={'List'}>
                        {reservations}
                    </ListGroup>
                </Stack>
            </ListGroup.Item>
                ;
        }),totalWeekReservations]
    },[currentDate,reservationsFilter,Reservations]);

    // When swapping Reservation Types, from dinner to bed reservations or vice versa, if there's a day viewing in "full-screen", clear it.
    useEffect(()=>{
        if(largeWeekDay[0] !== null) {setLargeWeekDay([null,[]])}
    },[reservationType]);

    // Get the days of the active week and the total number of reservations for that week.
    const [weekDays,totalWeekReservations] = generateWeekDays();
    // Buttons to navigate to the previous and next week.
    const {goToPreviousWeek, goToNextWeek} = navigateWeeks;
    const handlePrevWeek = () => {
        goToPreviousWeek();
        setLargeWeekDay([null,[]]);
    }
    const handleNextWeek = () => {
        goToNextWeek();
        setLargeWeekDay([null,[]]);
    }

    return (
        <div className={'text-center p-0 h-100 position-relative d-flex flex-column'}>
            <div className="navigation my-2 d-flex flex-row">
                <Button onClick={handlePrevWeek} variant={"secondary"} size={'sm'} className={'m-2 rounded-3 ' + (!isToday ? 'hover-scale-1_03' : '')} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                <h6 className={'m-auto user-select-none'}>Κρατήσεις Εβδομάδας : {totalWeekReservations}</h6>
                <Button onClick={handleNextWeek} variant={"secondary"} size={'sm'} className={'m-2 rounded-3 ' + (!isLastWeek ? 'hover-scale-1_03' : '')} disabled={isLastWeek}>Επόμενη Εβδομάδα</Button>
            </div>
            <FiltersBar setReservationsFilter={setReservationsFilter}
                        reservationsFilter={reservationsFilter} direction={'horizontal'} className={'mx-auto my-2 border-secondary-subtle border rounded-4 p-2'}>
            </FiltersBar>
            <ListGroup horizontal={direction === 'horizontal'} gap={2}
                       className="week-days px-3 mx-3 overflow-y-auto h-100">
                {!largeWeekDay[0] ? weekDays : <LargeWeekDayDisplay reservations={largeWeekDay[1]} dateToDisplay={largeWeekDay[0]}
                reservationsFilter={reservationsFilter} largeWeekDayHandling = {{largeWeekDay,setLargeWeekDay}}>
                </LargeWeekDayDisplay>}
            </ListGroup>
        </div>
    )
}
