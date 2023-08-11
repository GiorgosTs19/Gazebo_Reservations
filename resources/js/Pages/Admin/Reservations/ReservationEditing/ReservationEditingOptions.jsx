import {Button, Col, Row} from "react-bootstrap";
import {TransferReservationToAnotherDay} from "../../EditReservations/AnotherDay/TransferReservationToAnotherDay";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../../Contexts/EditReservationModalTitleContext";
import {ChangeReservationTableSameDay} from "../../EditReservations/SameDay/ChangeReservationTableSameDay";
import {getAvailabilityByDate} from "../../../../ExternalJs/Util";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";

export function ReservationEditingOptions({Content,ModalTitle}) {
    const {content,setContent} = Content,
    Reservations = useContext(ReservationsContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    availableTables = getAvailabilityByDate(activeReservation.Date, Reservations),
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext);
    console.log(availableTables)
    const noAvailableTablesExist = availableTables.every(table=>{return table.isAvailable === false});

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
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={4}>
                    <p className={'info-text-lg my-auto'}>
                        Θα γίνει προσπάθεια ανάθεσης του ίδιου τραπεζιού αυτόματα από το σύστημα.
                        Στην περίπτωση που το τραπέζι δεν είναι διαθέσιμο θα πρέπει να γίνει εκ νέου επιλογή τραπεζιού,
                        βάσει της διαθεσιμότητας της ημέρας.
                    </p>
                    <Button variant={'outline-dark'} className={'mt-3'} onClick={handleClickTransfer}>Μεταφορά σε άλλη μέρα</Button>
                </Col>
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={4}>
                    <p className={'info-text-lg my-auto'}>Εκ νέου επιλογή τραπεζιού,
                        με βάση την διαθεσιμότητα της ημέρας για την οποία έγινε η κράτηση.</p>
                    {noAvailableTablesExist && <p className={'text-danger fw-bold'}>Δεν υπάρχουν διαθέσιμα τραπέζια την ίδια μέρα.</p>}
                    <Button variant={'outline-dark'} className={'mt-3 ' + (noAvailableTablesExist ? 'opacity-25':'')}
                            onClick={handleClickChangeTable} disabled={noAvailableTablesExist}>
                        Αλλαγή τραπεζιού
                    </Button>
                </Col>
                <Col className={'d-flex flex-column my-3 my-lg-0'} lg={4}>
                    <p className={'info-text-lg my-auto'}>Αλλαγή των επιλεγμένων Μενού της κράτησης.</p>
                    <Button variant={'outline-dark'} className={'mt-3'}>Αλλαγή Μενού</Button>
                </Col>
            </Row>
        </>
    )
}
