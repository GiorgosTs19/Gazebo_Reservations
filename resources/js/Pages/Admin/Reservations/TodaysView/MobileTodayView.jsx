import {Badge, Stack} from "react-bootstrap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {useCallback, useContext} from "react";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";
import {MobileUtilityOffCanvas} from "../../OffCanvases/MobileUtilityOffCanvas";
import {AdminToNewReservationFormModal} from "../../Modals/AdminToNewReservationFormModal";

export function MobileTodayView({reservations_of_current_date, filter, children, requestProgress, dateDisabled}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {reservationsFilter,setReservationsFilter} = filter,
    innerWidth = useContext(InnerWidthContext),
    {reservationType, setReservationType} = useContext(ActiveReservationTypeContext);
    const shouldShowStack = activeReservation === null,
    [isDateDisabled,existingReservationsAllowed] = dateDisabled;

    const reservationsToShow = useCallback(()=> {
        if(reservations_of_current_date.length === 0)
            return <h4 className={'text-muted my-auto info-text-lg'}>Δεν υπάρχει κάποια κράτηση για σήμερα</h4>;

        const filteredReservations = reservationsFilter === 'All' ?  reservations_of_current_date :
            reservations_of_current_date.filter((reservation)=>{
                return reservation.Status === reservationsFilter;
            });

        if(filteredReservations.length === 0)
            return <h5 className={'my-auto text-wrap info-text-lg'}>Δεν υπάρχουν κρατήσεις για σήμερα που ταιριάζουν με τα επιλεγμένα κριτήρια</h5>

        const reservationsToRender = innerWidth > 800 ? 2 : 1;

        if(innerWidth > 500) {
            const reservationChunks = [];
            for (let i = 0; i < filteredReservations.length; i += reservationsToRender) {
                reservationChunks.push(filteredReservations.slice(i, i + reservationsToRender));
            }
            return reservationChunks.map((chunk, index) => (
                <div key={index} className="d-flex justify-content-center">
                    {chunk.map(reservation => (
                        <ReservationShort Reservation={reservation} key={reservation.id} className={`border mx-3 my-3 hover-scale-0_95 ${innerWidth <= 576 ? 'flex-fill mh-300px' : ''}`} />
                    ))}
                </div>
            ))
        }
        return filteredReservations.map((reservation)=> {
            return <ReservationShort Reservation={reservation} key={reservation.id} className={`border hover-scale-0_95 my-3 ${innerWidth <= 576 ? ' flex-fill mh-300px' : ''}`}/>;
        });
    },[reservations_of_current_date,reservationsFilter, shouldShowStack, innerWidth]);

    return ( <div className={'h-100 d-flex flex-column text-center'}>
            {shouldShowStack ? <>
                <MobileUtilityOffCanvas title={'Φίλτρα και Πληροφορίες'} height={25}>
                    <Stack direction={(innerWidth > innerHeight ) ? 'horizontal' : 'vertical'} gap={2} className={'d-flex w-100'}>
                        <section className={'d-flex flex-column text-center flex-fill'}>
                            {children}
                            <h6 className={'mt-1'}>{reservationType === 'Dinner' ? 'Βραδινές Κρατήσεις' : 'Πρωινές Κρατήσεις'}</h6>
                        </section>
                        <section className={'flex-fill d-flex'}>
                            {
                                isDateDisabled ? <Badge bg="danger" className={'m-auto p-2'}>Απενεργοποιημένη για {reservationType === 'Dinner' ? 'Βραδινές' : 'Πρωινές'} κρατήσεις</Badge> :
                                        <AdminToNewReservationFormModal returnButton reservationType={reservationType} forCurrentDate/>
                            }
                        </section>
                        <section className={'flex-fill'}>
                            {reservations_of_current_date.length > 0 &&
                                <FiltersBar setReservationsFilter={setReservationsFilter}
                                            disabled={reservations_of_current_date.length === 0}
                                            reservationsFilter={reservationsFilter}
                                            direction={'horizontal'}
                                            className={'m-auto'}></FiltersBar>}
                        </section>
                    </Stack>
                </MobileUtilityOffCanvas>
                <Stack className={'mt-1 px-4 mx-auto text-center overflow-y-auto h-85'}>
                    {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsToShow()}
                </Stack>
            </> : <MobileActiveReservationOffCanvas/>}
        </div>
    )
}
