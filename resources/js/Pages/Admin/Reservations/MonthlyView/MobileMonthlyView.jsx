import {Col, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {LeftArrowSVG} from "../../../../SVGS/LeftArrowSVG";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";

export function MobileMonthlyView({Calendar, reservationsToShow, selectedDate,
    reservationsFilter,setReservationsFilter}) {
    const [shouldShowCalendar,setShouldShowCalendar] = useState(true),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [reservations, reservationsCount] = reservationsToShow();

    useEffect(()=>{
        if(selectedDate !== '')
            setShouldShowCalendar(false)
    },[selectedDate]);
    const handleBackToCalendar = () =>{
        setShouldShowCalendar(true);
        setActiveReservation(null);
    };
    const calendarAndReservations = <Col className={'h-100 d-flex flex-column'}>
        {shouldShowCalendar ? <>
                {Calendar}
            </> :
            <>
                <LeftArrowSVG className={'my-2 mx-auto hover-scale-1_1'} width={innerWidth > 992 ? 50 : 32}
                              height={innerWidth > 992 ? 50 : 32}
                              rotate={90} onClick={handleBackToCalendar}/>
                {reservationsCount > 0 &&
                    <FiltersBar setReservationsFilter={setReservationsFilter} direction={'horizontal'}
                                reservationsFilter={reservationsFilter}
                                className={'mx-auto border-secondary-subtle border rounded-4 p-2 my-3'}>
                    </FiltersBar>}
                <Stack className={'p-3 overflow-y-auto ' + (innerWidth > 992 ? ' mh-600px' : ' h-75')}>
                    {/**/}
                    {reservations}
                </Stack>
            </>
        }
    </Col>;
    return (
        <Row className={`text-center h-100 ${shouldShowCalendar ? 'py-1' : 'py-0'}`}>
            {innerWidth < 992 ? (activeReservation === null && calendarAndReservations) : calendarAndReservations}
            {/*{activeReservation !== null && <Col lg={5} className={'d-flex flex-column text-center overflow-y-auto reservation-long-view py-lg-4'}>*/}
            {/*    <ReservationLong/>*/}
            {/*</Col>}*/}
            <MobileActiveReservationOffCanvas/>
        </Row>
    )
}
