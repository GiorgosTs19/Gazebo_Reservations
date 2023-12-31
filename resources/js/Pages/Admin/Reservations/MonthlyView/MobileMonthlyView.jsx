import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {Col, Row, Stack} from "react-bootstrap";
import {useState, useContext, useEffect} from "react";
import {LeftArrowSVG} from "../../../../SVGS/LeftArrowSVG";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";
import {formatDateInGreek} from "../../../../ExternalJs/Util";

export function MobileMonthlyView({Calendar, reservationsToShow, selectedDate,
    reservationsFilter,setReservationsFilter}) {
    const [shouldShowCalendar,setShouldShowCalendar] = useState(true),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [reservations, reservationsCount] = reservationsToShow(),
    {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);

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
                {selectedDate && <h5>{formatDateInGreek(selectedDate)}</h5>}
                <h6>{reservationType === 'Dinner' ? 'Βραδινές Κρατήσεις' : 'Πρωινές Κρατήσεις'}</h6>
                <Stack className={'p-3 overflow-y-auto d-flex' + (innerWidth > 992 ? ' mh-600px' : ' h-75')}>
                    {reservations}
                </Stack>
            </>
        }
    </Col>;
    return (
        <Row className={`text-center h-100 ${shouldShowCalendar ? 'py-1' : 'py-0'}`}>
            {innerWidth < 992 ? (activeReservation === null && calendarAndReservations) : calendarAndReservations}
            <MobileActiveReservationOffCanvas/>
        </Row>
    )
}
