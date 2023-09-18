import {Stack} from "react-bootstrap";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {changeDateFormat, extractReservationsForDate, getFormattedDate} from "../../../../ExternalJs/Util";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {MinimizeSVG} from "../../../../SVGS/MinimizeSVG";
import {useRef, useContext} from "react";
import {useScrollToActiveReservation} from "../../../../CustomHooks/useScrollToActiveReservation";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function LargeWeekDayDisplay({dateToDisplay,reservations,reservationsFilter, largeWeekDayHandling}) {
    const {largeWeekDay,setLargeWeekDay} = largeWeekDayHandling;
    const activeReservationRef = useRef(null);
    useScrollToActiveReservation(activeReservationRef);
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const reservationsToShow = ()=> {
        const filteredReservations = reservationsFilter === 'All' ? extractReservationsForDate(dateToDisplay,largeWeekDay.reservations) :
            reservations.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        // setCount(filteredReservations.length);
        if(filteredReservations.length === 0)
            return [<h4 className={'my-auto user-select-none'}>Δεν υπάρχουν κρατήσεις που ταιριάζουν με τα επιλεγμένα κριτήρια.</h4>,0]

        // Will always try to show as many reservations per line, to save space.
        const reservationsToRender = innerWidth > 1500 ? 2 : 1;
        const reservationChunks = [];
        for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
            reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
        }
        return [reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center mx-auto">
                {chunk.map(reservation => (
                    <ReservationShort ref={reservation.id === activeReservation?.id ? activeReservationRef : null} Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-3 my-5 hover-scale-0_95'} />
                ))}
            </div>
        )),filteredReservations.length]
    };
    const [reservationsToRender, count] = reservationsToShow();
    return (
        <>
            <div className={'d-flex flex-row'}>
                {<MinimizeSVG rotate={'0deg'} className={'my-auto hover-scale-1_1'} width={25} height={25}
                onClick={()=>setLargeWeekDay({date:null,reservations:[]})}></MinimizeSVG>}
                <h4 className={'m-auto'}>{changeDateFormat(getFormattedDate(dateToDisplay,'-',1),'-')}</h4>
                {count > 0 && <p className={'my-2 border-bottom py-2 px-4 box_shadow rounded-5 mx-auto user-select-none'} style={{width:'fit-content'}}>
                    {count} {useFilteredReservationsCountText(reservationsFilter,count)}</p>}
            </div>
            <Stack className={'px-3 overflow-y-auto monthly-reservation-stack'} >
                {reservationsToRender}
            </Stack>
        </>
    )
}
