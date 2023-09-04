import {getReservationsByDate} from "../ExternalJs/Util";
import useFilteredReservationsCountText from "./useFilteredReservationsCountText";
import {ListGroup} from "react-bootstrap";
import {ReservationShortest} from "../Pages/Admin/Reservations/ReservationViews/ReservationShortest";
import {MaximizeSVG} from "../SVGS/MaximizeSVG";

export function useRenderWeeklyReservations(day, Reservations, reservationsFilter,setLargeWeekDay) {
    const lastReservationsIndexToShow = innerWidth < 1400 ? 1 : ( innerWidth > 1600 ? 3 : 2);
    const reservations_of_current_date = getReservationsByDate(day,Reservations);
    if(reservations_of_current_date.length === 0)
        return [<h4 className={'text-muted m-auto user-select-none'}>Δεν υπάρχει κάποια κράτηση</h4>,0,reservations_of_current_date.length];

    const filteredReservations = reservationsFilter === 'All' ? reservations_of_current_date :
        reservations_of_current_date.filter((reservation) => {
            return reservation.Status === reservationsFilter;
        });

    if(filteredReservations.length === 0)
        return [<h4 className={'text-muted m-auto user-select-none'}>{useFilteredReservationsCountText(reservationsFilter,0)}</h4>,0,reservations_of_current_date.length];

    const mappedReservations = filteredReservations.map((reservation,index)=>{
        if(index < lastReservationsIndexToShow)
            return <ListGroup.Item key={reservation.id+index} className={'py-0 px-0 d-flex box_shadow border border-1 rounded-2 mx-2 mb-3 hover-scale-0_95'}>
                <ReservationShortest Reservation={reservation} key={index+reservation.id}></ReservationShortest>
            </ListGroup.Item>;
        if(index === lastReservationsIndexToShow)
            return <div className={'flex-column m-auto cursor-pointer hover-scale-1_03'} onClick={()=>setLargeWeekDay([day,filteredReservations])} key={reservation.id}>
                <MaximizeSVG rotate={'0deg'} className={'my-3'} ></MaximizeSVG>
                <h5 className={''}>... Περισσότερες Κρατήσεις</h5>
            </div>
        return null;
    });

    return [mappedReservations,filteredReservations.length,reservations_of_current_date.length,filteredReservations];
}
