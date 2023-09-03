import {Button, Col, Row} from "react-bootstrap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../../Contexts/EditReservationModalTitleContext";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {Inertia} from "@inertiajs/inertia";
import {TransferReservationToAnotherDay} from "../../EditReservations/AnotherDay/TransferReservationToAnotherDay";
import {useContext, useEffect, useState} from "react";
import {ChangeReservationTableSameDay} from "../../EditReservations/SameDay/ChangeReservationTableSameDay";
import {isDateDisabledByAdmin} from "../../../../ExternalJs/Util";

export function ReservationEditingOptions({Content}) {
    const {content,setContent} = Content,
    Reservations = useContext(ReservationsContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [availableTables, setAvailableTables] = useState([]),
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext),
    isDateDisabled = isDateDisabledByAdmin(activeReservation.Date,Reservations)[0];
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
        setContent(<TransferReservationToAnotherDay></TransferReservationToAnotherDay>);
        setModalTitle('Μεταφορά της κράτησης σε άλλη μέρα')
    };

    const handleClickChangeTable = () => {
        setContent(<ChangeReservationTableSameDay></ChangeReservationTableSameDay>);
        setModalTitle('Αλλαγή Gazebo την ίδια μέρα')
    };

    return (
        <>
            <h5 className={'text-danger'}>Οποιαδήποτε αλλαγή πρέπει πάντα να γίνεται έπειτα απο συνεννόηση με τον πελάτη.</h5>
            <Row className={'my-4'}>
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={isDateDisabled ? 6 :4}>
                    <p className={'info-text-lg my-auto'}>
                        Θα γίνει προσπάθεια ανάθεσης του ίδιου Gazebo αυτόματα από το σύστημα.
                    </p>
                    <Button variant={'secondary'} className={'mt-3 mx-auto'} onClick={handleClickTransfer}>Αλλαγή Ημερομηνίας</Button>
                </Col>
                {!isDateDisabled && <Col className={'d-flex flex-column my-3 my-lg-0'} lg={4}>
                    <p className={'info-text-lg my-auto'}>Εκ νέου επιλογή Gazebo,
                        με βάση την διαθεσιμότητα της ημέρας για την οποία έγινε η κράτηση.</p>
                    {noAvailableTablesExist &&
                        <p className={'text-danger fw-bold'}>Δεν υπάρχουν διαθέσιμα τραπέζια την ίδια μέρα.</p>}
                    <Button variant={'secondary'} className={'mt-3 mx-auto ' + (noAvailableTablesExist ? 'opacity-25' : '')}
                            onClick={handleClickChangeTable} disabled={noAvailableTablesExist || isDateDisabled}>
                        Αλλαγή Gazebo
                    </Button>
                </Col>}
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={isDateDisabled ? 6 :4}>
                    <p className={'info-text-lg my-auto'}>Αλλαγή των επιλεγμένων Μενού της κράτησης.</p>
                    <Button variant={'secondary'} className={'mt-3 mx-auto'} disabled>Προσωρινά μη Διαθέσιμο</Button>
                </Col>
            </Row>
        </>
    )
}
