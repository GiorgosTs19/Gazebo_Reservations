import {Button, Col, Row} from "react-bootstrap";
import {TransferReservationToAnotherDay} from "../../EditReservations/AnotherDay/TransferReservationToAnotherDay";
import {useContext, useEffect, useState} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../../Contexts/EditReservationModalTitleContext";
import {ChangeReservationTableSameDay} from "../../EditReservations/SameDay/ChangeReservationTableSameDay";
import {getAvailabilityByDate, isDateDisabledByAdmin} from "../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";
import {Inertia} from "@inertiajs/inertia";

export function ReservationEditingOptions({Content,ModalTitle}) {
    const {content,setContent} = Content,
    Reservations = useContext(ReservationsContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [availableTables, setAvailableTables] = useState([]),
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext),
    isDateDisabled = isDateDisabledByAdmin(activeReservation.Date,Reservations)[0];
    console.log(activeReservation.Date,isDateDisabled)
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
        setModalTitle('Αλλαγή τραπεζιού την ίδια μέρα')
    };

    return (
        <>
            <h5 className={'text-danger'}>Οποιαδήποτε αλλαγή πρέπει πάντα να γίνεται έπειτα απο συνεννόηση με τον πελάτη.</h5>
            <Row className={'my-4'}>
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={isDateDisabled ? 6 :4}>
                    <p className={'info-text-lg my-auto'}>
                        Θα γίνει προσπάθεια ανάθεσης του ίδιου τραπεζιού αυτόματα από το σύστημα.
                        Στην περίπτωση που το τραπέζι δεν είναι διαθέσιμο θα πρέπει να γίνει εκ νέου επιλογή τραπεζιού,
                        βάσει της διαθεσιμότητας της ημέρας.
                    </p>
                    <Button variant={'outline-dark'} className={'mt-3 mx-auto'} onClick={handleClickTransfer}>Μεταφορά σε άλλη μέρα</Button>
                </Col>
                {!isDateDisabled && <Col className={'d-flex flex-column my-3 my-lg-0'} lg={4}>
                    <p className={'info-text-lg my-auto'}>Εκ νέου επιλογή τραπεζιού,
                        με βάση την διαθεσιμότητα της ημέρας για την οποία έγινε η κράτηση.</p>
                    {noAvailableTablesExist &&
                        <p className={'text-danger fw-bold'}>Δεν υπάρχουν διαθέσιμα τραπέζια την ίδια μέρα.</p>}
                    <Button variant={'outline-dark'} className={'mt-3 ' + (noAvailableTablesExist ? 'opacity-25' : '')}
                            onClick={handleClickChangeTable} disabled={noAvailableTablesExist || isDateDisabled}>
                        Αλλαγή τραπεζιού
                    </Button>
                </Col>}
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={isDateDisabled ? 6 :4}>
                    <p className={'info-text-lg my-auto'}>Αλλαγή των επιλεγμένων Μενού της κράτησης.</p>
                    <Button variant={'outline-dark'} className={'mt-3 mx-auto'}>Αλλαγή Μενού</Button>
                </Col>
            </Row>
        </>
    )
}
