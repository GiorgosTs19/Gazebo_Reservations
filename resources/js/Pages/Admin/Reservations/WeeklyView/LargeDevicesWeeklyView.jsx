import {getFormattedDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {Button, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {useCallback, useContext, useEffect, useState} from "react";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {LargeWeekDayDisplay} from "./LargeWeekDayDisplay";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {useRenderWeeklyReservations} from "../../../../CustomHooks/useRenderWeeklyReservations";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";

export function LargeDevicesWeeklyView({currentDate, direction, filter, navigateWeeks,
    isToday, isLastWeek, propsReservations, requestProgress}) {
    const oneWeekLater = new Date(currentDate);
    oneWeekLater.setDate(currentDate.getDate() + 7);
    const {reservationsFilter, setReservationsFilter} = filter,
    [largeWeekDay,setLargeWeekDay] = useState({date:null, reservations: []
}),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    {activeReservation, setActiveReservation} = useContext(ActiveReservationContext),
    Disabled_Days = useContext(DisabledDaysContext),
    showReservationLong = () => {
        if(activeReservation !== null)
            return <ReservationLong></ReservationLong>
        return  <h4 className={'text-muted m-auto user-select-none info-text-xl'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες</h4>
    };

    // Generates the days of the active week and counts the total amount of reservations for that week.
    const generateWeekDays = useCallback(() => {
        let totalWeekReservations = 0;
        return [Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            day.setDate(currentDate.getDate() + index);
            const [Reservations,reservationsCount,totalReservations,unlistedReservations] = useRenderWeeklyReservations(day, propsReservations, reservationsFilter,setLargeWeekDay);
            totalWeekReservations += totalReservations;
            return <ListGroup.Item className={'my-2 d-flex flex-column box_shadow '} key={index}>
                <div className={'d-flex flex-row'}>
                    {/*{reservationsCount >= 3 && }*/}
                    {reservationsCount > 0 && <p className={'my-2 border-bottom py-2 px-4 box_shadow rounded-5 mx-auto user-select-none'} style={{width:'fit-content'}}>
                        {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount)}</p>}
                </div>
                <Stack direction={'horizontal'} key={'Stack'} className={''}>
                    <h3 className={'me-1 border-end pe-3 user-select-none ' + (isDateDisabledByAdmin(day,Disabled_Days)[0] ? 'disabled-day' : '')}>
                        {getFormattedDate(day,'/',3)}
                    </h3>
                    <ListGroup horizontal={'xl'} gap={5} className={'p-1 scrollable-x-not-vw mt-2 '} style={{overflowX:'auto'}} key={'List'}>
                        {Reservations}
                    </ListGroup>
                </Stack>
            </ListGroup.Item>;
        }),totalWeekReservations]
    },[currentDate,reservationsFilter, propsReservations]);

    // When swapping Reservation Types, from dinner to bed reservations or vice versa, if there's a day viewing in "full-screen", clear it.
    useEffect(()=>{
        if(largeWeekDay.date !== null)
            setLargeWeekDay(prev=> {
            return {...prev, date: null}
        })
    },[reservationType]);
    useEffect(()=>{
        if(largeWeekDay.date !== null)
            setLargeWeekDay((prev)=> {
                return {...prev, reservations: propsReservations}
            })
    },[propsReservations]);

    // Get the days of the active week and the total number of reservations for that week.
    const [weekDays,totalWeekReservations] = generateWeekDays();
    // Buttons to navigate to the previous and next week.
    const {goToPreviousWeek, goToNextWeek} = navigateWeeks;
    const handlePrevWeek = () => {
        goToPreviousWeek();
        setLargeWeekDay({date: null,reservations: []});
    }
    const handleNextWeek = () => {
        goToNextWeek();
        setLargeWeekDay({date: null,reservations: []});
    }

    return (
        <Row className={'h-100 w-100'}>
            <Col className={'text-center p-2 h-100 position-relative d-flex flex-column'}>
                <div className="navigation my-1 d-flex flex-row">
                    <Button onClick={handlePrevWeek} variant={"secondary"} size={'sm'} className={'m-2 rounded-3 ' + (!isToday ? 'hover-scale-1_03' : '')} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <h6 className={'m-auto user-select-none'}>Κρατήσεις Εβδομάδας : {totalWeekReservations}</h6>
                    <Button onClick={handleNextWeek} variant={"secondary"} size={'sm'} className={'m-2 rounded-3 ' + (!isLastWeek ? 'hover-scale-1_03' : '')} disabled={isLastWeek}>Επόμενη Εβδομάδα</Button>
                </div>
                <h6 className={'mb-4 mb-lg-0 user-select-none info-text'}>* Με <span className={'disabled-day'}>γραμμή</span> εμφανίζονται οι ημερομηνίες που έχετε απενεργοποιήσει</h6>
                <FiltersBar setReservationsFilter={setReservationsFilter}
                            reservationsFilter={reservationsFilter} direction={'horizontal'} className={'mx-auto my-2'}>
                </FiltersBar>
                <ListGroup horizontal={direction === 'horizontal'} gap={2}
                           className="week-days px-3 mx-3 overflow-y-auto h-100">
                    {!largeWeekDay.date ? (requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : weekDays) : <LargeWeekDayDisplay reservations={largeWeekDay.reservations} dateToDisplay={largeWeekDay.date}
                    reservationsFilter={reservationsFilter} largeWeekDayHandling = {{largeWeekDay,setLargeWeekDay}}>
                    </LargeWeekDayDisplay>}
                </ListGroup>
            </Col>
            <Col sm={12} md={8} lg={5} className={'d-flex flex-column text-center overflow-y-auto reservation-long-view py-lg-4'}>
                {showReservationLong()}
            </Col>
        </Row>
    )
}
