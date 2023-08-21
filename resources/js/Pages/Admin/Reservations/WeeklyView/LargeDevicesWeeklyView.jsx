import {getFormattedDate, getReservationsByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {Button, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {useCallback, useContext, useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {LargeWeekDayDisplay} from "./LargeWeekDayDisplay";
import {MaximizeSVG} from "../../../../SVGS/MaximizeSVG";

export function LargeDevicesWeeklyView({currentDate, direction, filter, navigateWeeks, isToday, isLastWeek}) {
    const Reservations = useContext(ReservationsContext),
    [showFilters,setShowFilters] = useState(false),
    {reservationsFilter, setReservationsFilter} = filter,
    [largeWeekDay,setLargeWeekDay] = useState([null,[]]),
    // Generates the reservations for each day of the active week.
    reservationsToShow = (day)=>{
        const reservations_of_current_date = getReservationsByDate(day,Reservations);
        if(reservations_of_current_date.length === 0)
            return [<h4 className={'text-muted m-auto user-select-none'}>Δεν υπάρχει κάποια κράτηση.</h4>,0,reservations_of_current_date.length];

        const filteredReservations = reservationsFilter === 'All' ? reservations_of_current_date :
            reservations_of_current_date.filter((reservation) => {
                return reservation.Status === reservationsFilter;
        });

        if(filteredReservations.length === 0)
            return [<h4 className={'text-muted m-auto user-select-none'}>{useFilteredReservationsCountText(reservationsFilter,0)}</h4>,0,reservations_of_current_date.length];

        const mappedReservations = filteredReservations.map((reservation,index)=>{
            return <ListGroup.Item key={reservation.id+index} className={'py-0 px-1 d-flex box_shadow border border-1 rounded-2 mx-2 mb-3'}>
                {/*(reservations_of_current_date.length > 2 ? '  ' : ' mx-auto')*/}
                <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
            </ListGroup.Item>;
        });

        return [mappedReservations,filteredReservations.length,reservations_of_current_date.length,filteredReservations];
    };

    // Generates the days of the active week and counts the total amount of reservations for that week.
    const generateWeekDays = useCallback(() => {
        let totalWeekReservations = 0;
        return [Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            day.setDate(currentDate.getDate() + index);
            const [reservations,reservationsCount,totalReservations,unlistedReservations] = reservationsToShow(day);
            totalWeekReservations += totalReservations;
            return <ListGroup.Item className={'my-2 d-flex flex-column box_shadow '} key={index}>
                <div className={'d-flex flex-row'}>
                    {reservationsCount >= 3 && <MaximizeSVG rotate={'0deg'} className={'my-auto'} onClick={()=>setLargeWeekDay([day,unlistedReservations])}></MaximizeSVG>}
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
    },[currentDate,reservationsFilter,Reservations])
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
            <div className={'text-center p-0 h-90 position-relative'} >
                <div className="navigation my-2 d-flex flex-row">
                    <Button onClick={handlePrevWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <h6 className={'m-auto user-select-none'}>Κρατήσεις Εβδομάδας : {totalWeekReservations}</h6>
                    <Button onClick={handleNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'} disabled={isLastWeek}>Επόμενη Εβδομάδα</Button>
                </div>
                <Row className={'h-100'}>
                    <Col lg={showFilters ? 2 : 1} className={'border border-1 rounded-3 d-flex flex-column justify-content-between box_shadow h-100'}>
                        {showFilters ? <>
                            <div>
                                <p className={'border-bottom user-select-none'}>
                                    <b>Κατάσταση</b>
                                </p>
                                <FiltersBar setReservationsFilter={setReservationsFilter}
                                            reservationsFilter={reservationsFilter}>
                                </FiltersBar>
                            </div>
                            <h6 onClick={()=>setShowFilters(false)} className={'cursor-pointer user-select-none'}>
                               Απόκρυψη
                            </h6>
                        </> :
                        <div className={'m-auto'}>
                            <ExpandSVG onClick={()=>setShowFilters(true)}></ExpandSVG>
                        </div>}
                    </Col>
                    <Col lg={showFilters ? 10 : 11} className={'p-0 h-100'}>
                        <ListGroup horizontal={direction === 'horizontal'} gap={2}
                                   className="week-days px-3 mx-3 overflow-y-auto h-100">
                            {!largeWeekDay[0] ? weekDays : <LargeWeekDayDisplay reservations={largeWeekDay[1]} dateToDisplay={largeWeekDay[0]}
                            reservationsFilter={reservationsFilter} largeWeekDayHandling = {{largeWeekDay,setLargeWeekDay}}>
                            </LargeWeekDayDisplay>}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
    )
}
