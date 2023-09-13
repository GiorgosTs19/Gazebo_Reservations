import {Button, Stack} from "react-bootstrap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../../Contexts/EditReservationModalTitleContext";
import {Inertia} from "@inertiajs/inertia";
import {TransferReservationToAnotherDay} from "../../EditReservations/AnotherDay/TransferReservationToAnotherDay";
import {useContext, useEffect, useState} from "react";
import {ChangeReservationTableSameDay} from "../../EditReservations/SameDay/ChangeReservationTableSameDay";
import {isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {DisabledDaysContext} from "../../Contexts/DisabledDaysContext";
import {EditModalContentContext} from "../../Contexts/EditModalContentContext";
import {CancelReservation} from "../../EditReservations/CancelReservation/CancelReservation";

export function ReservationEditingOptions({conflictType = null, edit, children = null}) {
    const {content,setContent} = useContext(EditModalContentContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [availableTables, setAvailableTables] = useState([]),
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext),
    Disabled_Days = useContext(DisabledDaysContext),
    [isDateDisabled, reservationsAllowed]= isDateDisabledByAdmin(activeReservation.Date,Disabled_Days);
    const noAvailableTablesExist = availableTables.every(table=>{return table.isAvailable === false});
    useEffect(()=>{
        if(activeReservation !== null) {
            Inertia.get(route('Get_Availability_For_Date'), {date: activeReservation.Date, type:activeReservation.Type},{
                only:['availability_for_date'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    setAvailableTables(res.props.availability_for_date);
                }
            });
        }
    },[]);

    const handleClickTransfer = () => {
        setContent(<TransferReservationToAnotherDay edit={edit}/>);
        setModalTitle('Αλλαγή ημερομηνίας της κράτησης')
    };

    const handleClickChangeTable = () => {
        setContent(<ChangeReservationTableSameDay edit={edit}/>);
        setModalTitle('Αλλαγή Gazebo την ίδια μέρα')
    };

    const handleClickCancelReservation = () => {
        setContent(<CancelReservation edit={edit}/>);
        setModalTitle('');
    };

    return (
        <>
            <Stack className={'my-4'} gap={4}>
                <section>
                    {children}
                </section>
                <section>
                    <p className={'info-text-lg my-auto'}>
                        Θα γίνει προσπάθεια ανάθεσης του ίδιου Gazebo αυτόματα
                    </p>
                    <Button variant={'secondary'} className={'mt-3 mx-auto'} onClick={handleClickTransfer}>Αλλαγή Ημερομηνίας</Button>
                </section>
                {((conflictType === 'Table' || conflictType === null) && !isDateDisabled ) && <section>
                    <p className={'info-text-lg my-auto'}>Αλλαγή Gazebo την ίδια μέρα</p>
                    {noAvailableTablesExist &&
                        <p className={'text-danger fw-bold info-text-lg mt-2 mb-1'}>Δεν υπάρχουν άλλα διαθέσιμα Gazebo την ίδια μέρα.</p>}
                    <Button variant={'secondary'} className={'mt-2 mx-auto ' + (noAvailableTablesExist ? 'opacity-25' : '')}
                            onClick={handleClickChangeTable} disabled={noAvailableTablesExist || isDateDisabled}>
                        Αλλαγή Gazebo
                    </Button>
                </section>}
                <section>
                    <p className={'info-text-lg my-auto'}>Αλλαγή των  Μενού της κράτησης</p>
                    <Button variant={'secondary'} className={'mt-3 mx-auto'} disabled>Προσωρινά μη Διαθέσιμο</Button>
                </section>
                <section>
                    <p className={'info-text-lg my-auto'}>Ακύρωση της κράτησης</p>
                    <Button variant={'outline-danger'} onClick={handleClickCancelReservation} className={'mt-3 mx-auto'} >Ακύρωση</Button>
                </section>
            </Stack>
        </>
    )
}
