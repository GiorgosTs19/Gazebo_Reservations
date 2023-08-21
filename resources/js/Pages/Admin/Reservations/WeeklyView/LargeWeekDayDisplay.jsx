import {Stack} from "react-bootstrap";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {getFormattedDate} from "../../../../ExternalJs/Util";
import useFilteredReservationsCountText from "../../../../CustomHooks/useFilteredReservationsCountText";
import {MinimizeSVG} from "../../../../SVGS/MinimizeSVG";

export function LargeWeekDayDisplay({dateToDisplay,reservations,reservationsFilter, largeWeekDayHandling}) {
    const {largeWeekDay,setLargeWeekDay} = largeWeekDayHandling;
    // const [count,setCount] = useState(reservations.length);
    const reservationsToShow = ()=> {
        const filteredReservations = reservationsFilter === 'All' ? reservations :
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
                    <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-3 my-5'} />
                ))}
            </div>
        )),filteredReservations.length]
    };
    const [reservationsToRender, count] = reservationsToShow();
    return (
        <>
            <div className={'d-flex flex-row'}>
            {<MinimizeSVG rotate={'0deg'} className={'my-auto'} onClick={()=>setLargeWeekDay([null,[]])}></MinimizeSVG>}
            <h4 className={'m-auto'}>{getFormattedDate(dateToDisplay,'-',1)}</h4>
            {count > 0 && <p className={'my-2 border-bottom py-2 px-4 box_shadow rounded-5 mx-auto user-select-none'} style={{width:'fit-content'}}>
                {count} {useFilteredReservationsCountText(reservationsFilter,count)}</p>}
        </div>
            <Stack className={'px-3 overflow-y-auto monthly-reservation-stack '} >
                {reservationsToRender}
            </Stack>
        </>
    )
}
