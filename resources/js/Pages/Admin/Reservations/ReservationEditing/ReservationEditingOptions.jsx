import {Button, Col, Row} from "react-bootstrap";
import {TransferReservationToAnotherDay} from "../../EditReservations/TransferReservationToAnotherDay";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../../Contexts/EditReservationModalTitleContext";

export function ReservationEditingOptions({Content,ModalTitle}) {
    const {content,setContent} = Content,
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext);

    const handleClickTransfer = () => {
        setContent(<TransferReservationToAnotherDay></TransferReservationToAnotherDay>);
        setModalTitle('Μεταφορά της κράτησης σε άλλη μέρα')
    };

    return (
        <>
            <h5 className={'text-danger'}>Οποιαδήποτε αλλαγή πρέπει πάντα να γίνεται έπειτα απο συνεννόηση με τον πελάτη.</h5>
            <Row className={'my-4'}>
                <Col className={'d-flex flex-column'}>
                    <p className={'text-warning my-auto'}>
                        Θα γίνει προσπάθεια ανάθεσης του ίδιου τραπεζιού αυτόματα από το σύστημα.
                        Στην περίπτωση που το τραπέζι δεν είναι διαθέσιμο θα πρέπει να γίνει εκ νέου επιλογή τραπεζιού,
                        βάσει της διαθεσιμότητας της ημέρας.
                    </p>
                    <Button variant={'outline-dark'} className={'mt-3'} onClick={handleClickTransfer}>Μεταφορά σε άλλη μέρα</Button>
                </Col>
                <Col className={'d-flex flex-column'}>
                    <p className={'text-warning my-auto'}>Εκ νέου επιλογή τραπεζιού,
                        με βάση την διαθεσιμότητα της ημέρας για την οποία έγινε η κράτηση.</p>
                    <Button variant={'outline-dark'} className={'mt-3'}>Αλλαγή τραπεζιού</Button>
                </Col>
                <Col className={'d-flex flex-column'}>
                    <p className={'text-warning my-auto'}>Αλλαγή των επιλεγμένων Μενού της κράτησης.</p>
                    <Button variant={'outline-dark'} className={'mt-3'}>Αλλαγή Μενού</Button>
                </Col>
            </Row>
        </>
    )
}
