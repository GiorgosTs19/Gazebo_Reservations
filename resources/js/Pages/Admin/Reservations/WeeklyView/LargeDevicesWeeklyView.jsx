import {getFormattedDate, getReservationsByDate} from "../../../../ExternalJs/Util";
import {Button, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {ReservationShortest} from "../ReservationViews/ReservationShortest";
import {useContext, useState} from "react";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";

export function LargeDevicesWeeklyView({currentDate, getBorder, direction, goToPreviousWeek, goToNextWeek, filter}) {
    const Reservations = useContext(ReservationsContext),
    [showFilters,setShowFilters] = useState(false),
    {reservationsFilter, setReservationsFilter} = filter,
    reservationsToShow = (day)=>{
        const reservations_of_current_date = getReservationsByDate(day,Reservations);
        if(reservations_of_current_date.length === 0)
            return [<h4 className={'text-muted m-auto'}>Δεν υπάρχει κάποια κράτηση.</h4>,0];

        if(reservationsFilter === 'All')
            return [reservations_of_current_date.map((reservation,index)=>{
                return <ListGroup.Item key={reservation.id+index} className={'py-0 px-1 d-flex box_shadow border border-1 rounded-2 mx-2 mb-3'}>
                    {/*(reservations_of_current_date.length > 2 ? '  ' : ' mx-auto')*/}
                    <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
                </ListGroup.Item>;
        }),reservations_of_current_date.length];
        const reservations = reservations_of_current_date.filter((reservation)=>{
            return reservation.Status === reservationsFilter;
        }).map((reservation,index)=>{
            return <ListGroup.Item key={reservation.id+index} className={'py-0 px-1 d-flex box_shadow border border-1 rounded-2 mx-2 mb-3'}>
                {/*(reservations_of_current_date.length > 2 ? '  ' : ' mx-auto')*/}
                <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
            </ListGroup.Item>;
        });
        if(reservations.length>0)
            return [reservations,reservations.length];

        return [<h4 className={'text-muted m-auto'}>{useFilteredReservationsCountText(reservationsFilter,0)}</h4>,0];
    };
    // const totalWeeksReservations = useMemo(()=>
    //     Reservations.filter((date)=>{
    //         return (new Date(date.Date).toISOString().split('T')[0] >= new Date(currentDate).toISOString().split('T')[0]
    //             && new Date(date.Date) < new Date().setDate(currentDate.getDate()+6)).forEach();
    // }),[currentDate]);
    const isToday = getFormattedDate(currentDate,'/',2) === getFormattedDate(new Date(),'/',2);
    const renderWeekDays = () => {
        return Array(7).fill(null).map((_,index)=>{
            const day = new Date(currentDate.getTime());
            const today = new Date();
            const yesterday = new Date(today).setDate(today.getDate()-1);
            day.setDate(currentDate.getDate() + index);

            const [reservations,reservationsCount] = reservationsToShow(day);
            return <ListGroup.Item className={'my-2 d-flex flex-column box_shadow ' + getBorder(index) + (day < yesterday ? ' opacity-25' : '')} key={index}>
                {reservationsCount > 0 && <p className={'my-2 border-bottom py-2 px-4 box_shadow rounded-5 mx-auto'} style={{width:'fit-content'}}>
                    {reservationsCount} {useFilteredReservationsCountText(reservationsFilter,reservationsCount)}</p>}
                    <Stack direction={'horizontal'} key={'Stack'} className={''}>
                            <h3 className={'me-1 border-end pe-3'}>
                                {getFormattedDate(day,'/',3)}
                            </h3>
                        <ListGroup horizontal={'xl'} gap={5} className={'p-1 scrollable-x-not-vw mt-2 '} style={{overflowX:'auto'}} key={'List'}>
                            {reservations}
                        </ListGroup>
                    </Stack>
                </ListGroup.Item>
            ;
        })
    };

    return (
            <div className={'text-center p-0 h-90 position-relative'} >
                <div className="navigation my-2">
                    <Button onClick={goToPreviousWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'} disabled={isToday}>Προηγούμενη Εβδομάδα</Button>
                    <Button onClick={goToNextWeek} variant={"outline-dark"} size={'sm'} className={'m-2 rounded-3'}>Επόμενη Εβδομάδα</Button>
                </div>
                <Row className={'h-100'}>
                    <Col lg={showFilters ? 2 : 1} className={'border border-1 rounded-3 d-flex flex-column justify-content-between box_shadow h-100'}>
                        {showFilters ? <>
                            <div>
                                <p className={'border-bottom'}>
                                    <b>Κατάσταση</b>
                                </p>
                                <FiltersBar setReservationsFilter={setReservationsFilter}
                                            reservationsFilter={reservationsFilter}>
                                </FiltersBar>
                            </div>
                            <h6 onClick={()=>setShowFilters(false)} style={{cursor:"pointer"}}>
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
                            {renderWeekDays()}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
    )
}
